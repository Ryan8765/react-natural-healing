import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';



export default (initialState) => {
	return createStore(
		rootReducer,
		applyMiddleware(thunk)
	);
}