import axios from 'axios';

// import { URL } from 'constants/app.config';
import {
  fetchResult,
  fetchError,
} from 'actions/common.ax';
import {
  HOME_FETCH_BLOG_PAGE,
} from 'actionTypes/Home.at';

export const fetchBlogPost = () => (dispatch) => {
  axios({
    method: 'GET',
    // url: `${URL}/blog-content/all_blog_urls.json`,
    url: 'https://raw.githubusercontent.com/wiki/PrudhviRaj5/blog-content/Home.md',
  })
    .then((response) => {
      dispatch(fetchResult(HOME_FETCH_BLOG_PAGE, response.data));
    })
    .catch((e) => {
      dispatch(fetchError(e));
    });
};
