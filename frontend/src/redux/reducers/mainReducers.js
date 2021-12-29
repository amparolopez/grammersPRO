import { combineReducers } from 'redux';
import userReducers from './userReducers';
import postsReducers from './postsReducers';
import adminReducer from './adminReducer';

const mainReducer = combineReducers({
    userReducers,
    postsReducers,
    adminReducer
});

export default mainReducer;