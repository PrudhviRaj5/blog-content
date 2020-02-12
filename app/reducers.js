/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

// import globalReducer from 'containers/App/reducer';

import BlogListReducer from 'containers/MainLayout/Home/BlogList/reducer';
import BlogPageReducer from 'containers/MainLayout/Home/BlogPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    // global: globalReducer, // used for auth etc
    blogList: BlogListReducer,
    blogPage: BlogPageReducer,
  });

  return rootReducer;
}
