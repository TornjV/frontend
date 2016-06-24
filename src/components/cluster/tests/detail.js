/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint no-sequences: 0 */
import expect from 'expect';
import actions from '../actions/detail';
import store from '../../../store';
import { CLUSTER_DETAIL } from '../constants';


const clusterDetailTest = describe('Testing detail of cluster', () => {
  it('get initial state', () => {
    expect(store.dispatch(actions.reset()))
      .toEqual({
        payload: {
          status: 'initial',
        },
        type: CLUSTER_DETAIL,
      });
  }),
   it('get success state', () => {
     expect(store.dispatch(actions.success({ roles: [] })))
      .toEqual({
        payload: {
          cluster: { roles: [] },
          roles: [],
          status: 'success',
        },
        type: CLUSTER_DETAIL,
      });
   }),
   it('get pending state', () => {
     expect(store.dispatch(actions.begin()))
      .toEqual({
        payload: {
          status: 'pending',
        },
        type: CLUSTER_DETAIL,
      });
   }),
   it('get pending state', () => {
     expect(store.dispatch(actions.fail('ErorR')))
      .toEqual({
        payload: {
          status: 'error',
          error: 'ErorR',
        },
        type: CLUSTER_DETAIL,
      });
   });
});

export default clusterDetailTest;
