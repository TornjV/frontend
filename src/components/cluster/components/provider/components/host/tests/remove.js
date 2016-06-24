/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint no-sequences: 0 */
import expect from 'expect';
import actions from '../actions/remove';
import store from '../../../../../../../store';
import { HOST_REMOVE } from '../constants';


const hostRemoveTest = describe('Testing remove of host', () => {
  it('get initial state', () => {
    expect(store.dispatch(actions.reset()))
      .toEqual({
        payload: {
          status: 'initial',
        },
        type: HOST_REMOVE,
      });
  }),
   it('get success state', () => {
     expect(store.dispatch(actions.success({})))
      .toEqual({
        payload: {
          host: {},
          status: 'success',
        },
        type: HOST_REMOVE,
      });
   }),
   it('get pending state', () => {
     expect(store.dispatch(actions.begin()))
      .toEqual({
        payload: {
          status: 'pending',
        },
        type: HOST_REMOVE,
      });
   }),
   it('get error state', () => {
     expect(store.dispatch(actions.fail('ErorR')))
      .toEqual({
        payload: {
          status: 'error',
          error: 'ErorR',
        },
        type: HOST_REMOVE,
      });
   });
});

export default hostRemoveTest;
