import { createAction } from 'redux-actions';
import { fetch } from '../../../../utils';
import { PROVIDER_CREATE } from '../constants';


const reset = createAction(PROVIDER_CREATE, () => ({
  status: 'initial',
}));

const begin = createAction(PROVIDER_CREATE, () => ({
  status: 'pending',
}));

const success = createAction(PROVIDER_CREATE, provider => ({
  provider,
  status: 'success',
}));

const fail = createAction(PROVIDER_CREATE, error => ({
  status: 'error',
  error,
}));

const create = (clusterId, type, properties) =>
  (dispatch, getState) => {
    dispatch(begin());
    const apiUrl = getState().backend.apiUrl;
    fetch({
      url: `${apiUrl}/clusters/${clusterId}/providers`,
      method: 'POST',
      body: {
        ...properties,
        type,
      },
    })
      .then(provider => {
        dispatch(success(provider));
        return provider;
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
  create,
};


export default actions;
