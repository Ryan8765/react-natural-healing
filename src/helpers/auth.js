/*
	Auth helper functions.
 */

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
	unauth_redirect_h 
};