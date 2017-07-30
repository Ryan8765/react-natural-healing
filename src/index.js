import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_USER } from './actions/types';

//redux
import { Provider } from 'react-redux';
import Store from './store';

const StoreInstance = Store();

//if we have a token - we consider the user to be signed in and change the state to make the user signed in.  This allows a page refresh - normally that would reset the state to the user being signed out - but we first check for a tocken - if there is a token we set the state to show the user to be signed in. 
const token = localStorage.getItem('token');
if( token ) {
	StoreInstance.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={StoreInstance}>
  	<App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
