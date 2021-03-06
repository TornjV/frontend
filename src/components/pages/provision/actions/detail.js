import { createAction } from 'redux-actions';
import { fetch } from '../../../../utils';
import { API_URL } from '../../../../backend_url';
import { PROVISION_DETAIL } from '../constants';


export const reset = createAction(PROVISION_DETAIL, () => ({ status: 'initial' }));

export const begin = createAction(PROVISION_DETAIL, () => ({ status: 'pending' }));

export const success = createAction(PROVISION_DETAIL, provision => ({
  status: 'success',
  provision,
}));

export const successProvision = createAction(PROVISION_DETAIL, provision => ({
  status: 'success',
  provision: {
    ...provision,
    status: 'SUCCESS',
  },
}));

export const fail = createAction(PROVISION_DETAIL, error => ({
  status: 'error',
  error,
}));

export const failProvision = createAction(PROVISION_DETAIL, (provision, error) => ({
  status: 'error',
  error,
  provision: {
    ...provision,
    status: 'FAILED',
  },
}));

export const get = id =>
  dispatch => {
    dispatch(begin());
    fetch({
      url: `${API_URL}/provisions/${id}`,
    })
      .then(provision => {
        dispatch(success(provision));
        return provision;
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
  failProvision,
  successProvision,
  get,
};

export default actions;
