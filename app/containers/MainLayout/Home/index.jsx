import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import homeRoutes from './routes';


const Home = () => {
  return (
    <Switch>
      {
        homeRoutes.map((route) => (
          <Route
            path={`/home${route.path}`}
            key={route.key}
            component={route.component}
            exact={route.exact}
          />
        ))
      }
    </Switch>
  );
};

export default withRouter(Home);
