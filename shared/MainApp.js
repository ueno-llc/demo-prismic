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
import Contact from './routes/contact';
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
        { /* <Route component={PrismicToolbar} /> */ }
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/articles" component={Articles} />
          <Route path="/contact-us" component={Contact} />
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
