import { combineReducers } from 'redux';
import login from './components/auth/reducers';
import applicationReducer from './components/cluster/components/application/reducers';
import clusterReducer from './components/cluster/reducers';
import providerReducer from './components/cluster/components/provider/reducers';


const reducers = {
  login,
};

applicationReducer.map(reducer => {
  reducers[reducer.name] = reducer;
  return undefined;
});

clusterReducer.map(reducer => {
  reducers[reducer.name] = reducer;
  return undefined;
});

providerReducer.map(reducer => {
  reducers[reducer.name] = reducer;
  return undefined;
});


const rootReducer = combineReducers(reducers);

export default rootReducer;
