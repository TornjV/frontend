import { createAction } from 'redux-actions';
import { fetch } from '../../utils';
import { API_URL } from '../../backend_url';
import { CLUSTER_DETAIL } from '../../constants/ActionTypes';

export const reset = createAction(CLUSTER_DETAIL, () => ({ status: 'initial' }));
export const begin = createAction(CLUSTER_DETAIL, () => ({ status: 'pending' }));

export const success = createAction(CLUSTER_DETAIL, cluster => ({
  cluster,
  applications: cluster.applications,
  roles: cluster.roles,
}));

export const fail = createAction(CLUSTER_DETAIL, error => error);

export const get = id =>
  dispatch => {
    dispatch(begin());
    fetch({
      url: `${API_URL}/clusters/${id}`,
    })
      .then(json => {
        dispatch(success(json));
        return json;
      })
      .catch(error => {
        dispatch(fail(error.message));
      });
  };

const actions = {
  reset,
  begin,
  success,
  fail,
  get,
};

export default actions;
