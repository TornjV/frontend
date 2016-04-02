/* eslint camelcase: 0 */

import { createAction } from 'redux-actions';
import { fetch } from '../../../../../utils';
import { API_URL } from '../../../../../backend_url';
import { CLUSTER_SERVICE } from '../constants';
import get_services from '../../../../service/actions/list';

export const reset = createAction(CLUSTER_SERVICE, () => ({
  status: 'initial',
}));

export const begin = createAction(CLUSTER_SERVICE, () => ({
  status: 'pending',
}));

export const success = createAction(CLUSTER_SERVICE, service => ({
  service,
  status: 'success',
}));

export const fail = createAction(CLUSTER_SERVICE, error => ({
  status: 'error',
  error,
}));

export const add = (clusterId, service, username) =>
  dispatch => {
    dispatch(begin());
    fetch({
      url: `${API_URL}/clusters/${clusterId}/services`,
      method: 'post',
      body: {
        service,
        username,
      },
    })
      .then(srvc => {
        dispatch(success(srvc));
        return srvc;
      })
      .catch(error => {
        dispatch(fail(error.message));
      });
  };

export const get = get_services.get;

const actions = {
  reset,
  begin,
  success,
  fail,
  add,
  get,
};

export default actions;
