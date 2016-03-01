import expect from 'expect';
import actions from '../actions/remove';
import store from '../../../../../store';
import { PROVIDER_REMOVE } from '../constants';


const providerRemoveTest = describe('Testing of provider', () => {
   it('get initial state', () => {
     expect(store.dispatch(actions.reset()))
      .toEqual({
        payload: {
          status: 'initial',
        },
        type: PROVIDER_REMOVE,
     })
  }),
   it('get pending state', () => {
     expect(store.dispatch(actions.begin()))
      .toEqual({
        payload: {
          status: 'pending',
        },
        type: PROVIDER_REMOVE,
     })
  }),
   it('get pending error state', () => {
     expect(store.dispatch(actions.fail('ErorR')))
      .toEqual({
        payload: {
          status: 'error',
          error: 'ErorR',
        },
        type: PROVIDER_REMOVE,
     })
  })
});

export default providerRemoveTest;
