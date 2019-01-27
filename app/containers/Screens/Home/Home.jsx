import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import homeRoutes from 'routes/homeRoutes';

import './Home.scss';


const Home = () => {
  return (
    <Switch>
      {
        homeRoutes.map(e => (
          <Route
            path={`/home${e.path}`}
            key={e.key}
            component={e.component}
            exact={e.exact}
          />
        ))
      }
    </Switch>
  );
};

export default withRouter(Home);
