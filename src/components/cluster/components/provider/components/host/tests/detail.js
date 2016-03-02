import expect from 'expect';
import actions from '../actions/detail';
import store from '../../../../../../../store';
import { HOST_DETAIL } from '../constants';


const hostDetailTest = describe('Testing detail of host', () => {
   it('get initial state', () => {
     expect(store.dispatch(actions.reset()))
      .toEqual({
        payload: {
          status: 'initial',
        },
        type: HOST_DETAIL,
     })
  }),
   it('get pending state', () => {
     expect(store.dispatch(actions.begin()))
      .toEqual({
        payload: {
          status: 'pending',
        },
        type: HOST_DETAIL,
     })
  }),
   it('get error state', () => {
     expect(store.dispatch(actions.fail('ErorR')))
      .toEqual({
        payload: {
          status: 'error',
          error: 'ErorR',
        },
        type: HOST_DETAIL,
     })
  })
});

export default hostDetailTest;
