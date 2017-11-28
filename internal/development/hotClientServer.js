import fs from 'fs';
import express from 'express';
import createWebpackMiddleware from 'webpack-dev-middleware';
import createWebpackHotMiddleware from 'webpack-hot-middleware';
import ListenerManager from './listenerManager';
import config from '../../config';
import { log } from '../utils';

class HotClientServer {

  constructor(compiler) {
    const app = express();
    const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    const httpPath = compiler.options.output.publicPath;

    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
      throw new Error(
        'You must supply an absolute public path to a development build of a web target bundle as it will be hosted on a seperate development server to any node target bundles.',
      );
    }

    this.webpackDevMiddleware = createWebpackMiddleware(compiler, {
      quiet: true,
      noInfo: true,
      headers: {
        'Access-Control-Allow-Origin': `http://${config('host')}:${config('port')}`,
      },
      // Ensure that the public path is taken from the compiler webpack config
      // as it will have been created as an absolute path to avoid conflicts
      // with an node servers.
      publicPath: config('bundles.client.webPath'),
    });

    app.use(this.webpackDevMiddleware);
    app.use(createWebpackHotMiddleware(compiler));

    const listener = app.listen(config('clientDevServerPort'));

    this.listenerManager = new ListenerManager(listener, 'client');

    compiler.plugin('compile', () => {
      log({
        title: 'client',
        level: 'info',
        message: 'Building new bundle...',
      });
    });

    compiler.plugin('done', (stats) => {
      if (stats.hasErrors()) {
        log({
          title: 'client',
          level: 'error',
          message: 'Build failed, please check the console for more information.',
          notify: true,
        });
        console.error(stats.toString());
      } else {
        log({
          title: 'client',
          level: 'info',
          message: 'Running with latest changes.',
          notify: true,
        });
        // Save the build stats to a file so it can be used for serving css chunks
        fs.writeFileSync('build/stats.json', JSON.stringify(stats.toJson()));
      }
    });
  }

  dispose() {
    this.webpackDevMiddleware.close();

    return this.listenerManager ? this.listenerManager.dispose() : Promise.resolve();
  }
}

export default HotClientServer;
