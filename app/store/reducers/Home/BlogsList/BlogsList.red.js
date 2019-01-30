import {
  HOME_FETCH_BLOGS_LIST,
} from 'actionTypes/Home.at';

const initialState = {
  fetching: true,
  data: [],
};

const sortData = data => data.sort(
  (a, b) => new Date(b.date_published) - new Date(a.date_published),
);

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HOME_FETCH_BLOGS_LIST:
      return {
        ...state,
        data: sortData(payload),
        fetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
