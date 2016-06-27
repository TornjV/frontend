import { combineReducers } from 'redux';
import login from './components/pages/login/reducers';
import sidebar from './components/atoms/sidebar/reducers';


const reducers = {
  login,
  sidebar,
};


const rootReducer = combineReducers(reducers);

export default rootReducer;
