import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import Authentication from './reducers/AuthenticationReducer';
import Layout from './reducers/LayoutReducer'
import ResetPassword from './reducers/ResetPasswordReducer'
import Welcome from './reducers/WelcomeReducer'

export const history = createBrowserHistory();

const initialState = { };

const enhancers :[] = [];

const middleware = [
	thunk,
	routerMiddleware(history)
];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(
	applyMiddleware(...middleware),
	...enhancers
);

const rootReducer = combineReducers({
	router: connectRouter(history),
	Authentication,
	Layout,
	ResetPassword,
	Welcome
});

export default createStore(
	rootReducer,
	initialState,
	composedEnhancers
)
