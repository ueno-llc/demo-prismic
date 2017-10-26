import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import config from 'utils/config';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Header from 'components/header';
import Footer from 'components/footer';
import Navigation from 'components/navigation';
import DevTools from 'components/devtools';
import Analytics from 'components/analytics';

// Routes
import Home from './routes/home';
import About from './routes/about';
import Articles from './routes/articles';
import Search from './routes/search';
import NotFound from './routes/not-found';

export default function App() {
  const links = [
    <Link key="home" to="/">Home</Link>,
    <Link key="articles" to="/articles">Articles</Link>,
    <Link key="about" to="/about">About</Link>,
  ];

  return (
    <AppLayout>
      <Helmet {...config('helmet')} />

      <Header>
        <Navigation>
          {links}
        </Navigation>
      </Header>

      <Content>
        <Route component={Analytics} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/articles" component={Articles} />
          <Route path="/search/:q" component={Search} />
          <Route component={NotFound} />
        </Switch>
        <DevTools />
      </Content>

      <Footer>
        {links}
      </Footer>
    </AppLayout>
  );
}
