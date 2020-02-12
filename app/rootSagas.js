import { all, call, fork } from 'redux-saga/effects';

// import globalSaga from 'containers/App/saga';

import BlogListSaga from 'containers/MainLayout/Home/BlogList/sagas';
import BlogPostSaga from 'containers/MainLayout/Home/BlogPage/sagas';


function* rootSaga() {
  const sagas = [
    // globalSaga,
    BlogListSaga,
    BlogPostSaga,
  ];

  yield all(
    sagas.map((saga) => fork(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    })),
  );
}

export default rootSaga;
