import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import config from 'utils/config';
import { getField } from 'utils/prismic';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Header from 'components/header';
import Footer from 'components/footer';
import Navigation from 'components/navigation';
import DevTools from 'components/devtools';
import Analytics from 'components/analytics';

/**
 * We can't use the prismic-toolbar package at the moment because of a bug
 * with loading the edit button.
 * It's being loaded "the old way" in ServerHTML
 */
// import PrismicToolbar from 'components/prismic-toolbar';

// Routes
import Home from './routes/home';
import About from './routes/about';
import Articles from './routes/articles';
import CustomPage from './routes/custom-page';
import NotFound from './routes/not-found';

class App extends Component {
  get pages() {
    const { jobResult } = this.props;
    const customPages = jobResult.map(({ uid, data: { title } }) => (
      <Link key={uid} to={`/${uid}`}>{getField(title, 'text')}</Link>
    ));

    return [
      <Link key="home" to="/">Home</Link>,
      <Link key="articles" to="/articles">Articles</Link>,
      ...customPages,
      <Link key="about" to="/about">About</Link>,
    ]
  }

  render() {
    return (
      <AppLayout>
        <Helmet {...config('helmet')} />

        <Header>
          <Navigation>
            {this.pages}
          </Navigation>
        </Header>

        <Content>
          <Route component={Analytics} />
          { /* <Route component={PrismicToolbar} /> */ }
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/articles" component={Articles} />
            <Route exact path="/:id" component={CustomPage} />
            <Route component={NotFound} />
          </Switch>
          <DevTools />
        </Content>

        <Footer>
          {this.pages}
        </Footer>
      </AppLayout>
    );
  }
}

const appWithJob = withJob({
  work: ({ prismic }) => prismic.getByType({ type: 'custom_page' }),
})(App);

export default inject('prismic')(appWithJob);
