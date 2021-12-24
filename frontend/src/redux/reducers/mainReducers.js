import { combineReducers } from 'redux';
import userReducers from './userReducers';
import postsReducers from './postsReducers';

const mainReducer = combineReducers({
    userReducers,
    postsReducers,
});

export default mainReducer;