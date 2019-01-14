import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const rootReducer = combineReducers({
});

const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    // logger,
  ),
);

export default configureStore;
