import { createAction } from 'redux-actions';
import { fetch } from '../../../../utils';
import { HOST_EDIT } from '../constants';
import { get } from './detail';

const reset = createAction(HOST_EDIT, () => ({
  status: 'initial',
}));

const begin = createAction(HOST_EDIT, () => ({
  status: 'pending',
}));

const success = createAction(HOST_EDIT, host => ({
  host,
  status: 'success',
}));

const fail = createAction(HOST_EDIT, error => ({
  status: 'error',
  error,
}));

const edit = (cId, pId, hId, fields) =>
  (dispatch, getState) => {
    dispatch(begin());
    const apiUrl = getState().backend.apiUrl;
    fetch({
      url: `${apiUrl}/clusters/${cId}/providers/${pId}/hosts/${hId}`,
      method: 'PATCH',
      body: fields,
    })
      .then(host => {
        dispatch(success(host));
        return host;
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
  edit,
  get,
};

export default actions;
