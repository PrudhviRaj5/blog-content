import {
  FETCH_ERROR,
} from 'actionTypes/common.at';

export const fetchResult = (actionType, payload) => ({ type: actionType, payload });

export const fetchError = (e) => {
  // console.log('fetch error', e);
  return { type: FETCH_ERROR, payload: e };
};
