import produce from 'immer';
import {
  FETCH_BLOG_POST_INITIATE,
  FETCH_BLOG_POST_SUCCESS,
  FETCH_BLOG_POST_ERROR,
} from './constants';

// Initial states
export const initialState = {
  isFetching: true,
  isError: false,
  data: {},
  error: {},
};

/* eslint-disable default-case, no-param-reassign */
const blogPostReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case FETCH_BLOG_POST_INITIATE:
      draft.isFetching = true;
      break;

    case FETCH_BLOG_POST_SUCCESS:
      draft.isFetching = false;
      draft.data = action.payload;
      break;

    case FETCH_BLOG_POST_ERROR:
      draft.isFetching = false;
      draft.isError = true;
      draft.error = {}; // action payload
      break;
  }
});

export default blogPostReducer;
