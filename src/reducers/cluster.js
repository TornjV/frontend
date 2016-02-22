import { CLUSTER } from '../constants/ActionTypes';

export default function cluster(state = {}, action) {
  switch (action.type) {
    case CLUSTER:
      return action.payload;
    default:
      return state;
  }
}
