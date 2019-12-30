/**
 * @file Provides Redux state for Authentication related data.
 * @author James W Cramer
 */
import { Reducer } from 'redux';
import { AuthenticationActionTypes } from '../creators/AuthenticationCreators'
import { AuthenticationCreators } from '../creators/types/AuthenticationCreators'

/**
 * @typedef FormField
 * @type {object}
 * 
 * @property {string} value 	-The value of the field
 * @property {bool} isValid 	-If the field is valid
 * @property {bool} touched		-If the field has been modified
 */

/**
 * @typedef LoginForm
 * @type {object}
 * 
 * @property {FormField} username 				- The username form field
 * @property {FormField1} password 				- The password form field
 * @property {boolean} forgotPasswordLoading 	- Waiting to send password reset challenge
 * @property {boolean} forgotPassword 			- Shows or hides the forgot password form
 * @property {boolean} forgotPasswordSuccess 	- Sent the user the password reset challenge
 * @property {boolean} forgotPasswordError 		- Failed to send the user the password reset challenge
 */

/**
 * @typedef AuthenticationReducerState
 * @type {object}
 * 
 * @property {LoginForm} form 			- The state of the login and forgot password forms
 * @property {boolean} authenticating 	- We are checking if the user is authenticated
 * @property {boolean} authenticated 	- The user is authenticated
 * @property {boolean} loggingIn 		- We are waiting for the user to be logged in
 * @property {boolean} loggingOut 		- We are waiting for the user to be logged out
 * @property {boolean} logoutError 		- There was an error logging out the user
 * @property {boolean} loginError 		- There was an error logging in the user
 * @property {object} session 			- The active session information for an authenticated user
 */

/**
 * The initial state of the Authentication Reducer.
 * @var {AuthenticationReducerState} initialState
 */
const initialState: AuthenticationReducerState = {
	form: {
		username: { value: '', isValid: true, touched: false },
		password: { value: '', isValid: true, touched: false },
		forgotPasswordLoading: false,
		forgotPassword: false,
		forgotPasswordSuccess: false,
		forgotPasswordError: false
	},
	authenticating: false,
	authenticated: null,
	loggingIn: false,
	loggingOut: false,
	logoutError: false,
	loginError: false,
	session: null,
	sessionExpiresInSeconds: null,
	showSessionExpireWarning: false,
	inactivityTimeoutInSeconds: null,
	showInactivityTimeoutWarning: false
};

/**
 * @function handleSetInactivityTimeout
 * This method sets the state to indicate that the inactivity timeout is about to expire.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
export const handleSetInactivityTimeout = (state: AuthenticationReducerState, action: AuthenticationCreators.SetInactivityTimeoutWarning) => {
	return {
		...state,
		form: { ...state.form },
		inactivityTimeoutInSeconds: action.inactivityTimeoutInSeconds,
		showInactivityTimeoutWarning: true
	};
}

/**
 * @function handleClearInactivityTimeout
 * This method sets the state to indicate that the inactivity timeout is about to expire.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
export const handleClearInactivityTimeout = (state: AuthenticationReducerState, action: AuthenticationCreators.ClearInactivityTimeoutWarning) => {
	return {
		...state,
		form: { ...state.form },
		inactivityTimeoutInSeconds: null,
		showInactivityTimeoutWarning: false
	};
}

/**
 * @function handleSetSessionTimeoutWarning
 * This method sets the state to indicate that the session is about to expire.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
export const handleSetSessionTimeoutWarning = (state: AuthenticationReducerState, action: AuthenticationCreators.SetSessionTimeoutWarning) => {
	return {
		...state,
		form: { ...state.form },
		sessionExpiresInSeconds: action.sessionExpiresInSeconds,
		showSessionExpireWarning: true
	};
}

/**
 * @function handleClearSessionTimeoutWarning
 * This method clears the state values related to the session timeout warning.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
export const handleClearSessionTimeoutWarning = (state: AuthenticationReducerState, action: AuthenticationCreators.ClearSessionTimeoutWarning) => {
	return {
		...state,
		form: { ...state.form },
		sessionExpiresInSeconds: null,
		showSessionExpireWarning: false
	};
}

/**
 * @function handleLoggingIn
 * This method sets the state to indicate that we are waiting for the login
 * process to complete.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleLoggingIn = (state: AuthenticationReducerState, action: AuthenticationCreators.LoggingIn) => {
	return { ...state, form: { ...state.form }, loggingIn: true, loginError: false };
}

/**
 * @function handleLoggedIn
 * This method sets the state to indicate that the user has successfully logged in.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string, session: object }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleLoggedIn = (state: AuthenticationReducerState, action: AuthenticationCreators.LoggedIn) => {
	return {
		...state,
		form: {
			username: { value: '', isValid: true, touched: false },
			password: { value: '', isValid: true, touched: false },
			forgotPasswordLoading: false,
			forgotPassword: false,
			forgotPasswordSuccess: false,
			forgotPasswordError: false
		},
		loggingIn: false,
		loginError: false,
		session: action.session,
		authenticated: true
	};
}

/**
 * @function handleLoginFailure
 * This method sets the state to indicate that a login attemped failed.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleLoginFailure = (state: AuthenticationReducerState, action: AuthenticationCreators.LoginFailure) => {
	return { ...state, form: { ...state.form }, loggingIn: false, loginError: true };
}

/**
 * @function handleLoggedOut
 * This method sets the state to indicate that the user has logged out.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleLoggedOut = (state: AuthenticationReducerState, action: AuthenticationCreators.LoggedOut) => {
	return { ...state, form: { ...state.form }, loggingOut: false, session: null, authenticated: false };
}

/**
 * @function handleLoggingOut
 * This method sets the state to indicate that we are waiting for
 * the logout process to complete.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleLoggingOut = (state: AuthenticationReducerState, action: AuthenticationCreators.LoggingOut) => {
	return { ...state, form: { ...state.form }, loggingOut: true, logoutError: false };
}

/**
 * @function handleLogoutFailure
 * This method sets the state to indicate that the logout process has failed.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleLogoutFailure = (state: AuthenticationReducerState, action: AuthenticationCreators.LogoutFailure) => {
	return { ...state, form: { ...state.form }, loggingOut: false, logoutError: true };
}

/**
 * @function handleAuthenticating
 * This method sets the state to indicate that we are checking if the user
 * is authenticated.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleAuthenticating = (state: AuthenticationReducerState, action: AuthenticationCreators.Authenticating) => {
	return { ...state, form: { ...state.form }, authenticating: true };
}

/**
 * @function handleAuthenticatingSuccess
 * This method sets the state to indicate that the user is authenticated.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string, session: object }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleAuthenticatingSuccess = (state: AuthenticationReducerState, action: AuthenticationCreators.AuthenticatingSuccess) => {
	return { ...state, form: { ...state.form }, authenticating: false, session: action.session, authenticated: true };
}

/**
 * @function handleAuthenticatingFailure
 * This method sets the state to indicate that the user is not authenticated.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleAuthenticatingFailure = (state: AuthenticationReducerState, action: AuthenticationCreators.AuthenticatingFailure) => {
	return { ...state, form: { ...state.form }, authenticating: false, session: null, authenticated: false };
}

/**	@typedef FormChangeAction
 * @type {object}
 * @property {string}	type 		- AuthenticationActionTypes.FormChange					
 * @property {string}	field		- The name of the changed field. 			
 * @property {string}	value		- The value of the changed field. 		
 * @property {boolean}	isValid		- If the field is valid.		
 */

/**
 * @function handleFormChange
 * This method sets the state to reflect changes to the login or forgot password form.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {FormChangeAction} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleFormChange = (state: AuthenticationReducerState, action: AuthenticationCreators.FormChange) => {
	return {
		...state,
		form: { ...state.form, [action.field]: { value: action.value, isValid: action.isValid, touched: true } }
	};
}

/**
 * @function handleForgotPasswordToggle
 * This method sets the state to toggle the visibility of the login and forgot password forms.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleForgotPasswordToggle = (state: AuthenticationReducerState, action: AuthenticationCreators.ForgotPasswordToggle) => {
	return {
		...state,
		form: {
			username: { value: '', isValid: true, touched: false },
			password: { value: '', isValid: true, touched: false },
			forgotPassword: !state.form.forgotPassword,
			forgotPasswordSuccess: false,
			forgotPasswordError: false,
			forgotPasswordLoading: false
		}
	};
}

/**
 * @function handleForgotPasswordSuccess
 * This method sets the state to indicate that we have sent the password reset verification to the user.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleForgotPasswordSuccess = (state: AuthenticationReducerState, action: AuthenticationCreators.ForgotPasswordSuccess) => {
	return { ...state, form: { ...state.form, forgotPasswordSuccess: true, forgotPasswordError: false, forgotPasswordLoading: false } };
}

/**
 * @function handleForgotPasswordFailure
 * This method sets the state to indicate that the was an error trying to send 
 * the password reset verification to the user.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleForgotPasswordFailure = (state: AuthenticationReducerState, action: AuthenticationCreators.ForgotPasswordFailure) => {
	return { ...state, form: { ...state.form, forgotPasswordSuccess: false, forgotPasswordError: true, forgotPasswordLoading: false } };
}

/**
 * @function handleForgotPasswordFailure
 * This method sets the state to indicate that we are waiting for the password reset verification
 * to be sent to the user.
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }} action 
 * 
 * @returns {AuthenticationReducerState} The mutated state.
 */
const handleForgotPasswordLoading = (state: AuthenticationReducerState, action: AuthenticationCreators.ForgotPasswordLoading): AuthenticationReducerState => {
	return { ...state, form: { ...state.form, forgotPasswordSuccess: false, forgotPasswordError: false, forgotPasswordLoading: true } };
}

/**
 * Maps the handler methods to the Authentication Action Types
 * @var {object} handlers
 */
const handlers =
	{
		[AuthenticationActionTypes.LoggedOut]: handleLoggedOut,
		[AuthenticationActionTypes.LoggingOut]: handleLoggingOut,
		[AuthenticationActionTypes.LogoutFailure]: handleLogoutFailure,
		[AuthenticationActionTypes.LoggingIn]: handleLoggingIn,
		[AuthenticationActionTypes.LoggedIn]: handleLoggedIn,
		[AuthenticationActionTypes.LoginFailure]: handleLoginFailure,
		[AuthenticationActionTypes.Authenticating]: handleAuthenticating,
		[AuthenticationActionTypes.AuthenticatingSuccess]: handleAuthenticatingSuccess,
		[AuthenticationActionTypes.AuthenticatingFailure]: handleAuthenticatingFailure,
		[AuthenticationActionTypes.FormChange]: handleFormChange,
		[AuthenticationActionTypes.ForgotPasswordToggle]: handleForgotPasswordToggle,
		[AuthenticationActionTypes.ForgotPasswordSuccess]: handleForgotPasswordSuccess,
		[AuthenticationActionTypes.ForgotPasswordFailure]: handleForgotPasswordFailure,
		[AuthenticationActionTypes.ForgotPasswordLoading]: handleForgotPasswordLoading,
		[AuthenticationActionTypes.SetSessionTimeoutWarning]: handleSetSessionTimeoutWarning,
		[AuthenticationActionTypes.ClearSessionTimeoutWarning]: handleClearSessionTimeoutWarning,
		[AuthenticationActionTypes.SetInactivityTimeoutWarning]: handleSetInactivityTimeout,
		[AuthenticationActionTypes.ClearInactivityTimeoutWarning]: handleClearInactivityTimeout
	};

/**
 * @function AuthenticationReducer
 * This method is the reducer passed to redux that will respond to all 
 * Authentication actions.
 * 
 * @exports
 * @see /src/creators/AuthenticationCreators
 * 
 * @param {AuthenticationReducerState} state 
 * @param {{ type: string }|FormChangeAction} action 
 * 
 * @returns {AuthenticationReducerState} 
 * 	The initial state if there is no current state, the mutated state if an action 
 * 	was handled, or the current state if the argument action was not handled.
 */
const AuthenticationReducer: Reducer<AuthenticationReducerState> = (state: AuthenticationReducerState, action: AuthenticationCreators.Actions): AuthenticationReducerState => {
	if (state === undefined) {
		return initialState;
	}

	if (action && action.type && handlers.hasOwnProperty(action.type)) {
		return handlers[action.type](state, action)
	}
	else {
		return state;
	}
}

export default AuthenticationReducer