import { AuthenticationCreators } from "./types/AuthenticationCreators";

/**
 * @file Provides Redux actions for Authentication related events.
 * @author James W Cramer
 */

/**
 * @readonly
 * @export
 * @typedef AuthenticationActionTypes
 * @type {object}
 * @property {string}	LoggedOut					-The user is logged out.
 * @property {string}	LoggingOut					-The user is in the process of logging out.
 * @property {string}	LogoutFailure				-There was a problem logging out.
 * @property {string}	LoggingIn					-The user is in the process of logging in.
 * @property {string}	LoggedIn					-The user has been logged in.
 * @property {string}	LoginFailure				-The login process has failed.
 * @property {string}	Authenticating				-We are checking if the user is authenticated.
 * @property {string}	AuthenticatingSuccess		-We have ensured that the user is authenticated.
 * @property {string}	AuthenticatingFailure		-We have determined that the user is not authenticated.
 * @property {string}	ForgotPasswordSuccess		-We have tried to send the user a forgot password verification request.
 * @property {string}	ForgotPasswordFailure		-We failed to send the user a forgot password verification request.
 * @property {string}	ForgotPasswordLoading		-We are in the process of try to send the user a forgot password verification request.
 * @property {string}	FormChange					-The login or forgot password form has changed
 * @property {string}	ForgotPasswordToggle		-Toggles the forgot password and login forms.
 * @property {string}	SetSessionTimeoutWarning
 * @property {string}	ClearSessionTimeoutWarning
 * @property {string}	SetInactivityTimeoutWarning
 * @property {string}	ClearInactivityTimeoutWarning
 */
export const AuthenticationActionTypes = 
{
	LoggedOut: 'AUTHENTICATION_LOGGED_OUT',
	LoggingOut: 'AUTHENTICATION_LOGGING_OUT',
	LogoutFailure: 'AUTHENTICATION_LOGOUT_FAILURE',
	LoggingIn: 'AUTHENTICATION_LOGGING_IN',
	LoggedIn: 'AUTHENTICATION_LOGGED_IN',
	LoginFailure: 'AUTHENTICATION_LOGIN_FAILURE',
	Authenticating: 'AUTHENTICATION_AUTHENTICATING',
	AuthenticatingSuccess: 'AUTHENTICATION_AUTHENTICATING_SUCCESS',
	AuthenticatingFailure: 'AUTHENTICATION_AUTHENTICATING_FAILURE',
	ForgotPasswordSuccess: 'AUTHENTICATION_FORGOT_PASSWORD_SUCCESS',
	ForgotPasswordFailure: 'AUTHENTICATION_FORGOT_PASSWORD_FAILURE',
	ForgotPasswordLoading: 'AUTHENTICATION_FORGOT_PASSWORD_LOADING',
	FormChange: 'AUTHENTICATION_FORM_CHANGE',
	ForgotPasswordToggle: 'FORGOT_PASSWORD_TOGGLE',
	SetSessionTimeoutWarning: 'AUTHENTICATION_SET_SESSION_TIMEOUT_WARNING',
	ClearSessionTimeoutWarning: 'AUTHENTICATION_CLEAR_SESSION_TIMEOUT_WARNING',
	SetInactivityTimeoutWarning: 'AUTHENTICATION_SET_INACTIVITY_TIMEOUT_WARNING',
	ClearInactivityTimeoutWarning: 'AUTHENTICATION_CLEAR_INACTIVITY_TIMEOUT_WARNING',
	TemporaryPasswordSetLoading: 'TEMPORARY_PASSWORD_SET_LOADING',
	TemporaryPasswordSetSuccess: 'TEMPORARY_PASSWORD_SET_SUCCESS',
	TemporaryPasswordSetFailure: 'TEMPORARY_PASSWORD_SET_FAILURE',
}

/** @function SetInactivityTimeoutWarning
 * Sets the number of seconds until the user's inactivity timeout will expire.
 * 
 * @param {number} expiresInSeconds
 * 
 * @returns {{type: string}} 
 * 			AuthenticationActionTypes.SetInactivityTimeoutWarning
 */
export const SetInactivityTimeoutWarning: AuthenticationCreators.SetInactivityTimeoutWarningCreator = ( inactivityTimeoutInSeconds: number ): AuthenticationCreators.SetInactivityTimeoutWarning =>
{
	return { type:AuthenticationActionTypes.SetInactivityTimeoutWarning, inactivityTimeoutInSeconds: inactivityTimeoutInSeconds }
}

/** @function ClearInactivityTimeoutWarning
 * Clears the number of seconds until the user's inactivity timeout will expire.
 * 
 * @returns {{type: string}} 
 * 			AuthenticationActionTypes.ClearInactivityTimeoutWarning
 */
export const ClearInactivityTimeoutWarning: AuthenticationCreators.ClearInactivityTimeoutWarningCreator = (): AuthenticationCreators.ClearInactivityTimeoutWarning  =>
{
	return { type:AuthenticationActionTypes.ClearInactivityTimeoutWarning }
}

/** @function SetSessionTimeoutWarning
 * Sets the number of seconds until the user's session will expire.
 * 
 * @param {number} sessionExpiresInSeconds
 * 
 * @returns {{type: string}} 
 * 			AuthenticationActionTypes.SetSessionTimeoutWarning
 */
export const SetSessionTimeoutWarning: AuthenticationCreators.SetSessionTimeoutWarningCreator = ( sessionExpiresInSeconds: number ): AuthenticationCreators.SetSessionTimeoutWarning   =>
{
	return { type:AuthenticationActionTypes.SetSessionTimeoutWarning, sessionExpiresInSeconds: sessionExpiresInSeconds }
}

/** @function ClearSessionTimeoutWarning
 * Clears the number of seconds until the user's session will expire.
 * 
 * @returns {{type: string}} 
 * 			AuthenticationActionTypes.ClearSessionTimeoutWarning
 */
export const ClearSessionTimeoutWarning: AuthenticationCreators.ClearSessionTimeoutWarningCreator = (): AuthenticationCreators.ClearSessionTimeoutWarning   =>
{
	return { type:AuthenticationActionTypes.ClearSessionTimeoutWarning }
}

/** @function LoggedOut
 * When a user is logged out.
 * 
 * @returns {{type: string}} 
 * 			AuthenticationActionTypes.LoggedOut
 */
export const LoggedOut: AuthenticationCreators.LoggedOutCreator = (): AuthenticationCreators.LoggedOut =>
{
	return { type:AuthenticationActionTypes.LoggedOut }
}

/** @function LoggingOut
 * When a user is in the process of logging out.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.LoggingOut
 */
export const LoggingOut: AuthenticationCreators.LoggingOutCreator = (): AuthenticationCreators.LoggingOut   =>
{
	return { type:AuthenticationActionTypes.LoggingOut }
}

/** @function LogoutFailure
 * There was a problem logging out.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.LogoutFailure
 */
export const LogoutFailure: AuthenticationCreators.LogoutFailureCreator = (): AuthenticationCreators.LogoutFailure   =>
{
	return { type:AuthenticationActionTypes.LogoutFailure };
}

/** @function LoggingIn
 * The user is in the process of logging in.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.LoggingIn
 */
export const LoggingIn: AuthenticationCreators.LoggingInCreator = (): AuthenticationCreators.LoggingIn   =>
{
	return { type:AuthenticationActionTypes.LoggingIn };
}
		
/** @function LoggedIn
 * The user has been logged in.
 * 
 * @param {object} session 
 * 		The session information provided by the authentication service.
 * 
 * @returns {{type: string, session:object}} 
 * 	Returns an action with the type LoggedIn and the session provided by the authentication service.
 */
export const LoggedIn: AuthenticationCreators.LoggedInCreator = ( session: JSON ): AuthenticationCreators.LoggedIn   =>
{
	return { type: AuthenticationActionTypes.LoggedIn, session: session };
}

/** @function LoginFailure
 * The login process has failed.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.LoginFailure
 */
export const LoginFailure: AuthenticationCreators.LoginFailureCreator = (): AuthenticationCreators.LoginFailure   =>
{
	return { type:AuthenticationActionTypes.LoginFailure }
}

/** @function Authenticating
 * We are checking if the user is authenticated.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.Authenticating
 */
export const Authenticating: AuthenticationCreators.AuthenticatingCreator = ( ): AuthenticationCreators.Authenticating  =>
{
	return { type: AuthenticationActionTypes.Authenticating };
}

/** @function AuthenticatingSuccess
 * We have ensured that the user is authenticated.
 * 
 * @param {object} session -The session provided by the authentication service.
 * 
 * @returns {{type: string, session: object}} 
 * 		Returns an action with the type AuthenticatingSuccess and the session provided by the authentication service.
 */
export const AuthenticatingSuccess: AuthenticationCreators.AuthenticatingSuccessCreator = ( session: JSON ) : AuthenticationCreators.AuthenticatingSuccess =>
{
	return { 
		type: AuthenticationActionTypes.AuthenticatingSuccess,
		session: session
	};
}

/** @function AuthenticatingFailure
 * We have determined that the user is not authenticated.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.AuthenticatingFailure
 */
export const AuthenticatingFailure: AuthenticationCreators.AuthenticatingFailureCreator = ( ): AuthenticationCreators.AuthenticatingFailure   =>
{
	return { type: AuthenticationActionTypes.AuthenticatingFailure };
}

/** @function ForgotPasswordSuccess
 * We have tried to send the user a forgot password verification request.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.ForgotPasswordSuccess
 */
export const ForgotPasswordSuccess: AuthenticationCreators.ForgotPasswordSuccessCreator  = ( ): AuthenticationCreators.ForgotPasswordSuccess =>
{
	return { type: AuthenticationActionTypes.ForgotPasswordSuccess };
}

/** @function ForgotPasswordFailure
 * We failed to send the user a forgot password verification request.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.ForgotPasswordFailure
 */
export const ForgotPasswordFailure: AuthenticationCreators.ForgotPasswordFailureCreator = ( ): AuthenticationCreators.ForgotPasswordFailure =>
{
	return { type: AuthenticationActionTypes.ForgotPasswordFailure };
}

/** @function ForgotPasswordLoading
 * We are in the process of try to send the user a forgot password verification request.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.ForgotPasswordLoading
 */
export const ForgotPasswordLoading: AuthenticationCreators.ForgotPasswordLoadingCreator = ( ): AuthenticationCreators.ForgotPasswordLoading =>
{
	return { type: AuthenticationActionTypes.ForgotPasswordLoading };
}

/** @function ForgotPasswordToggle
 * Toggles the forgot password and login forms. 
 * 
 * @returns {{type: string}} AuthenticationActionTypes.ForgotPasswordToggle
 */
export const ForgotPasswordToggle: AuthenticationCreators.ForgotPasswordToggleCreator = (): AuthenticationCreators.ForgotPasswordToggle   =>
{
	return { type:AuthenticationActionTypes.ForgotPasswordToggle }
}

/** @function TemporaryPasswordSetSuccess
 * We failed to send the user a forgot password verification request.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.TemporaryPasswordSetSuccess
 */
export const TemporaryPasswordSetSuccess: AuthenticationCreators.TemporaryPasswordSuccessCreator  = ( ): AuthenticationCreators.TemporaryPasswordSuccess =>
{
	return { type: AuthenticationActionTypes.TemporaryPasswordSetSuccess };
}

/** @function TemporaryPasswordSetFailure
 * We failed to send the user a forgot password verification request.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.TemporaryPasswordSetFailure
 */
export const TemporaryPasswordSetFailure: AuthenticationCreators.TemporaryPasswordFailureCreator = ( ): AuthenticationCreators.TemporaryPasswordFailure =>
{
	return { type: AuthenticationActionTypes.TemporaryPasswordSetFailure };
}

/** @function TemporaryPasswordSetLoading
 * We are in the process of try to send the user a forgot password verification request.
 * 
 * @returns {{type: string}} AuthenticationActionTypes.TemporaryPasswordSetLoading
 */
export const TemporaryPasswordSetLoading: AuthenticationCreators.TemporaryPasswordLodingCreator = ( ): AuthenticationCreators.TemporaryPasswordLoading =>
{
	return { type: AuthenticationActionTypes.TemporaryPasswordSetLoading };
}

/**	@typedef FormChangeAction
 * @type {object}
 * @type {object}
 * @property {string}	type 		AuthenticationActionTypes.FormChange					
 * @property {string}	field		The name of the changed field. 			
 * @property {string}	value		The value of the changed field. 		
 * @property {boolean}	isValid			If the field is valid.		
 */

/** @function FormChange
 * The login or forgot password form has changed.
 * 
 * @param  {string} field    
 *         The name of the changed field. 
 * @param  {string} value    
 *         The value of the changed field. 
 * @param  {boolean} isValid    
 *         If the field is valid.
 * 
 * @returns {FormChangeAction}
 */
export const FormChange: AuthenticationCreators.FormChangeCreator = ( field: string, value: string, isValid: boolean ): AuthenticationCreators.FormChange =>
{
	return {
		type:AuthenticationActionTypes.FormChange,
		field:field,
		value:value,
		isValid:isValid
	};
}


