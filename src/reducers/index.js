import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
// import bookList from './booklist';

//this function handles combinging all of the reducers to the specific parts of your state.  For instance, "auth" is part of the states.  For those parts of the state, you provide a reducer, which reduces the state based on the action provided to it - and returns an updated state.
const rootReducer = combineReducers({
	auth: authReducer
});

export default rootReducer;