/*
	Auth helper functions.
 */

/**
 * Used to set User ID and user Auth token.
 * @param  {[type]} userID [string of userID returned from logging in]
 */
var setLocalUser_h = ( userID, token ) => {
	localStorage.setItem('token', token);
	localStorage.setItem('userID', userID);
};


/**
 * Removes user reference in local storage on user logout.
 * @return {[type]} [description]
 */
var removeLocalUser_h = () => {
	if( localStorage.getItem('token') ){
		localStorage.removeItem('token');
	}
	if( localStorage.getItem('userID') ) {
		localStorage.removeItem('userID');
	}
};

var getUserId_h = () => {
	var userID = localStorage.getItem('userID');
	if( userID ) {
		return localStorage.getItem('userID');
	}

	return false;
};


var getAuthToken_h =  () => {

	if( localStorage.getItem('token') ) {
		return localStorage.getItem('token');
	}
	
	return false;
};


var unauth_redirect_h =  (err, history) => {
	if( err.response.data === "Unauthorized" ) {
		history.push('/login');
	}
}



export { 
	getAuthToken_h,
	unauth_redirect_h,
	setLocalUser_h,
	getUserId_h ,
	removeLocalUser_h
};