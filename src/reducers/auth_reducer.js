import { removeLocalUser_h } from '../helpers/auth';

import { 
	AUTH_USER, 
	UNAUTH_USER, 
	AUTH_ERROR 
} from '../actions/types';


export default (state = {}, action) => {
	switch( action.type ) {
		case AUTH_USER: 
			return {...state, authenticated: true };
		case UNAUTH_USER: 
			removeLocalUser_h();
			return {...state, authenticated: false };
		case AUTH_ERROR: 
			return {...state, signinError: action.payload };
		default:
			return state;
	}
};