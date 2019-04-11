import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import themeReducer from './themeReducers';

export default combineReducers({
  auth: authReducer,
  theme: themeReducer,
  errors: errorReducer
});
