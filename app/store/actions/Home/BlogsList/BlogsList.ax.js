import axios from 'axios';

import { URL } from 'constants/app.config';
import {
  fetchResult,
  fetchError,
} from 'actions/common.ax';
import {
  HOME_FETCH_BLOGS_LIST,
} from 'actionTypes/Home.at';

export const fetchBlogsList = () => (dispatch) => {
  axios({
    method: 'GET',
    url: `${URL}/blog-content/all_blog_urls.json`,
  })
    .then((response) => {
      dispatch(fetchResult(HOME_FETCH_BLOGS_LIST, response.data.payload));
    })
    .catch((e) => {
      dispatch(fetchError(e));
    });
};
