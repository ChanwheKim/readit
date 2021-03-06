import {
  RECEIVE_USER_POSTS,
} from '../actions/types';

export default function userPostReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_USER_POSTS:
      return action.payload.map(article => article._id);
    default:
      return state;
  }
}
