import axios from 'axios';

import { URL } from 'constants/app.config';
import {
  fetchResult,
  fetchError,
} from 'actions/common.ax';
import {
  HOME_FETCH_BLOG_PAGE,
} from 'actionTypes/Home.at';

export const fetchBlogPost = url => (dispatch) => {
  axios({
    method: 'GET',
    url: `${URL}${url}.md`, // adding .md to url; removed while adding to router
  })
    .then((response) => {
      dispatch(fetchResult(HOME_FETCH_BLOG_PAGE, response.data));
    })
    .catch((e) => {
      dispatch(fetchError(e));
    });
};
