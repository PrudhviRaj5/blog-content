import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'utils/axiosBase';
import {
  FETCH_BLOG_POST,
} from './constants';

import {
  fetchBlogPostInitiate,
  fetchBlogPostSuccess,
  fetchBlogPostError,

  fetchCrashError,
} from './actions';

export function* fetchBlogPostSaga(action) {
  const actualUrl = `${action.url}.md`;
  yield put(fetchBlogPostInitiate());
  try {
    const response = yield axios.get(actualUrl);
    if (response.status === 200) {
      yield put(fetchBlogPostSuccess(response.data));
    } else {
      yield put(fetchBlogPostError(response));
    }
  } catch (err) {
    yield put(fetchCrashError(err));
  }
}

export default function* blogPost() {
  yield takeLatest(FETCH_BLOG_POST, fetchBlogPostSaga);
}
