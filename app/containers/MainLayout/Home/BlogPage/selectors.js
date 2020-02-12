import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBlogPage = (state) => state.blogPage || initialState;

const makeSelectBlogPostData = () => (
  createSelector(
    selectBlogPage,
    (blogPageState) => blogPageState.data,
  )
);

const makeSelectIsBlogPostFetching = () => (
  createSelector(
    selectBlogPage,
    (blogPageState) => blogPageState.isFetching,
  )
);

export {
  selectBlogPage,
  makeSelectBlogPostData,
  makeSelectIsBlogPostFetching,
};
