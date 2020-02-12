import {
  FETCH_BLOG_LIST,
  FETCH_BLOG_LIST_INITIATE,
  FETCH_BLOG_LIST_SUCCESS,
  FETCH_BLOG_LIST_ERROR,
} from './constants';

export const fetchBlogList = () => {
  return {
    type: FETCH_BLOG_LIST,
  };
};
export const fetchBlogListInitiate = () => {
  return {
    type: FETCH_BLOG_LIST_INITIATE,
  };
};
export const fetchBlogListSuccess = (payload) => {
  return {
    type: FETCH_BLOG_LIST_SUCCESS,
    payload,
  };
};
export const fetchBlogListError = () => {
  return {
    type: FETCH_BLOG_LIST_ERROR,
  };
};

export const fetchCrashError = (error) => {
  console.error(error);
  return {
    type: 'FETCH_CRASH_ERROR',
    error,
  };
};
