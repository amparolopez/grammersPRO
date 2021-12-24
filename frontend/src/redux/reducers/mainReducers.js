import { combineReducers } from 'redux';
import userReducers from './userReducers';

const mainReducer = combineReducers({
    userReducers,
});

export default mainReducer;