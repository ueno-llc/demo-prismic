import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import config from 'utils/config';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Header from 'components/header';
import Navigation from 'components/navigation';
import DevTools from 'components/devtools';
import Analytics from 'components/analytics';

// Routes
import Home from './routes/home';
import Articles from './routes/articles';
import NotFound from './routes/not-found';

export default function App() {
  return (
    <AppLayout>
      <Helmet {...config('helmet')} />
      <Header>
        <Navigation>
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
        </Navigation>
      </Header>
      <Content>
        <Route component={Analytics} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/articles" component={Articles} />
          <Route component={NotFound} />
        </Switch>
        <DevTools />
      </Content>
    </AppLayout>
  );
}
