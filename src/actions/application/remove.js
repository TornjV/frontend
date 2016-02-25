import { createAction } from 'redux-actions';
import { fetch } from '../../utils';
import { API_URL } from '../../backend_url';
import { PROVIDER_REMOVE } from '../../constants/ActionTypes';

export const reset = createAction(PROVIDER_REMOVE, () => ({
  status: 'initial',
}));

export const begin = createAction(PROVIDER_REMOVE, () => ({
  status: 'pending',
}));

export const success = createAction(PROVIDER_REMOVE, application => ({
  application,
  status: 'success',
}));

export const fail = createAction(PROVIDER_REMOVE, error => ({
  status: 'error',
  error,
}));

export const remove = (clusterId, applicationName) =>
  dispatch => {
    dispatch(begin());
    fetch({
      url: `${API_URL}/clusters/${clusterId}/applications/${applicationName}`,
      method: 'delete',
    })
      .then(application => {
        dispatch(success(application));
        return application;
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
  remove,
};

export default actions;
