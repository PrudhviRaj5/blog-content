import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store/store';

import Root from './containers/Root';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  );
};

render(Root);

/* eslint global-require: 0 */
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const newApp = require('./containers/Root').default;
    render(newApp);
  });
}
