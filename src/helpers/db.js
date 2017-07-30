import axios from 'axios';

/*
	Contains helpers for the database
 */



/**
 * Create a database item
 * @param  {[string]} url             [description]
 * @param {string} token [application token]
 * @param  {[object]} data        [data to post]
 * @param  {[func]} successCallback [success callback function]
 * @param  {[func]} errorCallback   [error callback function]
 */
var dbCreateItem_h = ( url, token, data, successCallback, errorCallback ) => {


	axios({
		method: 'post',
		url,
		headers: {
			authorization: token
		},
		data
	})
	.then(successCallback)
	.catch(errorCallback);

};



export {dbCreateItem_h};