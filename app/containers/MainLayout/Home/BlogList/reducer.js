import produce from 'immer';
import {
  FETCH_BLOG_LIST_INITIATE,
  FETCH_BLOG_LIST_SUCCESS,
  FETCH_BLOG_LIST_ERROR,
} from './constants';

// Initial states
export const initialState = {
  isFetching: true,
  isError: false,
  data: [],
  error: {},
};

const sortData = (data) => data.sort(
  (a, b) => new Date(b.date_published) - new Date(a.date_published),
);

/* eslint-disable default-case, no-param-reassign */
const blogListReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case FETCH_BLOG_LIST_INITIATE:
      draft.isFetching = true;
      break;

    case FETCH_BLOG_LIST_SUCCESS:
      draft.isFetching = false;
      draft.data = sortData(action.payload);
      break;

    case FETCH_BLOG_LIST_ERROR:
      draft.isFetching = false;
      draft.isError = true;
      draft.error = {}; // action payload
      break;
  }
});

export default blogListReducer;
