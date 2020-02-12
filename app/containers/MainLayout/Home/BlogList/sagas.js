import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'utils/axiosBase';
import {
  FETCH_BLOG_LIST,
} from './constants';

import {
  fetchBlogListInitiate,
  fetchBlogListSuccess,
  fetchBlogListError,

  fetchCrashError,
} from './actions';


export function* fetchBlogsListSaga() {
  const url = '/blog-content/all_blog_urls.json';
  yield put(fetchBlogListInitiate());
  try {
    const response = yield axios.get(url);
    if (response.status === 200) {
      yield put(fetchBlogListSuccess(response.data));
    } else {
      yield put(fetchBlogListError(response));
    }
  } catch (err) {
    yield put(fetchCrashError(err));
  }
}

export default function* blogList() {
  yield takeLatest(FETCH_BLOG_LIST, fetchBlogsListSaga);
}
