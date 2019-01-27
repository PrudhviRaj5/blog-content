import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import rootRoutes from 'routes/rootRoutes';

import 'material-components-web/dist/material-components-web.min.css';
import 'assets/scss/main.scss';

class Root extends Component {
  state = {}

  render() {
    return (
      <Router>
        <Switch>
          {
            rootRoutes.map(e => (
              <Route
                path={e.path}
                key={e.key}
                component={e.component}
                exact={e.exact}
              />
            ))
          }
        </Switch>
      </Router>
    );
  }
}

Root.propTypes = {
  // isAuthenticated: PropTypes.bool.isRequired,
  // fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {
    // fetchData: () => dispatch(fetchFilters()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
