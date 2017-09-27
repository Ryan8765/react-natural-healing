import { BASE_SERVER_URL } from '../config';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
import { setLocalUser_h } from '../helpers/auth';


//HISTORY is used to redirect user....
export const signinUser =  (email, password, history) => {

	return function( dispatch ) {
		//submit email/password to the server
		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/signin`,
			data: {
				email: email,
				password: password
			}
		})
		.then((res) => {
			console.log( res );
			//change state to show user has been logged in
			dispatch({type: AUTH_USER});
			//save token and userID to localStorage
			setLocalUser_h( res.data.userID, res.data.token );
			//redirect the user
			history.push('/welcome');
		})
		.catch((err) => {
			dispatch(authError('Check your email and password.  If you are new to this site, make sure you have verified your email.'));
		});
	};
	//submit email/pasword to the server
};


export const signOutUser =  () => {
	return {
		type: UNAUTH_USER
	}
}

//if error signing in
export const authError =  ( error ) => {
	return {
		type: AUTH_ERROR,
		payload: error
	};
};