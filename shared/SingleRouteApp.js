import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import config from 'utils/config';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Header from 'components/header';
import Navigation from 'components/navigation';
import DevTools from 'components/dev-tools';

// Routes
import SingleRoute from 'route';

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
        <Switch>
          <Route component={SingleRoute} />
        </Switch>
      </Content>

      <DevTools />
    </AppLayout>
  );
}
