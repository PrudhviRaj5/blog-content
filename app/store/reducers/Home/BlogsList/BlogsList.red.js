import {
  HOME_FETCH_BLOGS_LIST,
} from 'actionTypes/Home.at';

const initialState = {
  fetching: true,
  data: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HOME_FETCH_BLOGS_LIST:
      return {
        ...state,
        data: payload,
        fetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
