import { APPLICATION_CREATE } from '../constants';

export default function applicationCreate(
  state = { status: 'initial' },
  action
) {
  switch (action.type) {
    case APPLICATION_CREATE:
      return action.payload;
    default:
      return state;
  }
}
