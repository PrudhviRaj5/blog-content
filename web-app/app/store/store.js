import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Home_BlogPageReducer from 'reducers/Home/BlogPage/BlogPage.red';

const middleware = [thunk];

const rootReducer = combineReducers({
  Home_BlogPage: Home_BlogPageReducer,
});
/* eslint global-require: 0 */
if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger');
  middleware.push(logger);
}

const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(
    thunk,
  ),
);

export default configureStore;
