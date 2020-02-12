import {
  FETCH_BLOG_POST,
  FETCH_BLOG_POST_INITIATE,
  FETCH_BLOG_POST_SUCCESS,
  FETCH_BLOG_POST_ERROR,
} from './constants';


export const fetchBlogPost = (url) => {
  return {
    type: FETCH_BLOG_POST,
    url,
  };
};
export const fetchBlogPostInitiate = () => {
  return {
    type: FETCH_BLOG_POST_INITIATE,
  };
};
export const fetchBlogPostSuccess = (payload) => {
  return {
    type: FETCH_BLOG_POST_SUCCESS,
    payload,
  };
};
export const fetchBlogPostError = () => {
  return {
    type: FETCH_BLOG_POST_ERROR,
  };
};

export const fetchCrashError = (error) => {
  console.error(error);
  return {
    type: FETCH_BLOG_POST_ERROR,
    error,
  };
};
