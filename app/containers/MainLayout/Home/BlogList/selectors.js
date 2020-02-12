import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBlogList = (state) => state.blogList || initialState;

const makeSelectBlogListData = () => (
  createSelector(
    selectBlogList,
    (blogListState) => blogListState.data,
  )
);

const makeSelectIsBlogListFetching = () => (
  createSelector(
    selectBlogList,
    (blogListState) => blogListState.isFetching,
  )
);

export {
  selectBlogList,
  makeSelectBlogListData,
  makeSelectIsBlogListFetching,
};
