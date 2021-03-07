import { combineReducers } from 'redux';

import profil from './Reducers/profilReducer.js';
import posts from './Reducers/postsReducer.js';
import other from './Reducers/otherReducer.js';

export default combineReducers({
	profil,
	posts,
	other
});