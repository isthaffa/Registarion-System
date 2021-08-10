import { combineReducers } from 'redux';
import {USER_LOGGED_OUT} from "../containers/User/constants"
import { reducer as formReducer } from 'redux-form'


import userReducer from '../containers/User/reducers';
import homeReducer from '../containers/home/reducers';

const rootReducer = combineReducers({
  userReducer,
  homeReducer,
  form:formReducer
});

const appReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT) {
    state = undefined;
  }
  return rootReducer(state, action);
};

export default appReducer;