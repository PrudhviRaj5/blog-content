import React, {
  Suspense,
} from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import MainLayout from 'containers/MainLayout';
import Loader from 'components/Material/Loader';

import 'material-components-web/dist/material-components-web.min.css';
import '../../global-styles.scss';


const App = () => {
  return (
    <>
      <Helmet
        titleTemplate="%s - Prudhvi's Blog"
        defaultTitle="Prudhvi's Blog"
      >
        <title>Home</title>
      </Helmet>

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" component={MainLayout} />
        </Switch>
      </Suspense>
    </>
  );
};


export default compose(
  withRouter,
)(App);
