import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routeReducer as route, syncHistory } from 'redux-simple-router';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import onelove from './components/auth/actions';
import clusters from './components/clusters/actions';
import cluster from './components/cluster/actions';

const reducer = combineReducers({
  onelove,
  route,
  clusters,
  cluster,
});

function configureStore(initialState = {}, history) {
  const routerMiddleware = syncHistory(history);
  const middleware = applyMiddleware(thunk, routerMiddleware);
  const store = middleware(createStore)(reducer, initialState);
  return store;
}

export const history = createHashHistory({ queryKey: false });

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, history);

export default store;
