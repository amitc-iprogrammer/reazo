import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { OktaToken } from 'src/lib/Authentication/types/OktaAuth';
import * as AuthenticationCreators from '../creators/AuthenticationCreators';
import * as LayoutCreators from '../creators/LayoutCreators';
import AuthenticationService from '../lib/Authentication/AuthenticationService';
import StoreState from '../reducers/types/StoreState';

const inactivtyTimeoutSeconds: number = 30;
let inactivtyLogoutInterval: number | null = null;

const inactivtyWarningMilliseconds: number = 300 * 1000;
let inactivtyWarningTimeout: number | null = null;

/** @function handleInactivtyTimeout
 * 
 * @returns {function}
 */
export const onSetInactivtyTimeout = (): ThunkAction<void, StoreState, void, any> => {
	return (dispatch: Dispatch<any>, getState: () => StoreState) => {
		if (inactivtyWarningTimeout) {
			window.clearTimeout(inactivtyWarningTimeout);
			inactivtyWarningTimeout = null;
		}

		if (inactivtyLogoutInterval) {
			window.clearInterval(inactivtyLogoutInterval);
			inactivtyLogoutInterval = null;
			dispatch(AuthenticationCreators.ClearInactivityTimeoutWarning());
		}

		inactivtyWarningTimeout = window.setTimeout((): void => {

			if (getState().Authentication.authenticated === true) {
				dispatch(AuthenticationCreators.SetInactivityTimeoutWarning(inactivtyTimeoutSeconds));
			}

			inactivtyLogoutInterval = window.setInterval((): void => {

				const inactivityTimeout = getState().Authentication.inactivityTimeoutInSeconds;

				if (inactivityTimeout === null) { return };

				if (getState().Authentication.authenticated !== true) {
					if (inactivtyLogoutInterval) { window.clearInterval(inactivtyLogoutInterval); }
					if (inactivtyWarningTimeout) { window.clearTimeout(inactivtyWarningTimeout); }

					dispatch(AuthenticationCreators.ClearInactivityTimeoutWarning());
				}
				else if (inactivityTimeout > 0) {
					dispatch(AuthenticationCreators.SetInactivityTimeoutWarning(inactivityTimeout - 1));
				}
				else {
					if (inactivtyLogoutInterval) { window.clearInterval(inactivtyLogoutInterval); }
					if (inactivtyWarningTimeout) { window.clearTimeout(inactivtyWarningTimeout); }

					inactivtyLogoutInterval = null;
					inactivtyWarningTimeout = null;

					dispatch(AuthenticationCreators.LoggingOut());

					AuthenticationService.Logout()
						.then((): void => {
							dispatch(AuthenticationCreators.LoggedOut());
							dispatch(AuthenticationCreators.ClearInactivityTimeoutWarning());
							dispatch(LayoutCreators.HideMessage());
						})
						.catch((err: string) => dispatch(AuthenticationCreators.LogoutFailure()));
				}

			}, 1000);

		}, inactivtyWarningMilliseconds);
	}
}

let sessionTimeoutInterval: number | null = null;

/** @function handleSessionTimeoutWarning
 * 
 * @param  {function} dispatch    	-Redux dispatch
 * @param  {function} getState    	-Redux getState 
 * @param  {number} expiresInSeconds 	-How many seconds until the session expires
 * 
 * @returns {undefined}
 */
export const handleSessionTimeoutWarning =
	(dispatch: Dispatch<any>, getState: () => StoreState, expiresInSeconds: number) => {
		dispatch(AuthenticationCreators.SetSessionTimeoutWarning(expiresInSeconds));

		if (sessionTimeoutInterval != null) { window.clearInterval(sessionTimeoutInterval); }

		sessionTimeoutInterval = null;

		sessionTimeoutInterval = window.setInterval(() => {
			const sessionExpiresInSeconds = getState().Authentication.sessionExpiresInSeconds;

			if (sessionExpiresInSeconds === null) { return; }

			if (sessionExpiresInSeconds > 0) {
				dispatch(AuthenticationCreators.SetSessionTimeoutWarning(sessionExpiresInSeconds - 1));
			}
			else if (sessionExpiresInSeconds <= 0) {
				if (sessionTimeoutInterval) { window.clearInterval(sessionTimeoutInterval); }
				sessionTimeoutInterval = null;

				dispatch(AuthenticationCreators.LoggingOut());

				AuthenticationService.Logout()
					.then((): void => {
						dispatch(AuthenticationCreators.LoggedOut());
						dispatch(AuthenticationCreators.ClearSessionTimeoutWarning());
						dispatch(LayoutCreators.HideMessage());

					})
					.catch((err) => dispatch(AuthenticationCreators.LogoutFailure()));
			}

		}, 1000);
	}

export function onRefreshSession(): ThunkAction<void, StoreState, void, any> {
	return (dispatch: Dispatch<any>, getState: () => StoreState) => {
		dispatch(AuthenticationCreators.Authenticating());

		AuthenticationService.RefreshSession((expiresInSeconds) => handleSessionTimeoutWarning(dispatch, getState, expiresInSeconds))
			.then((refreshedToken) => {
				if (sessionTimeoutInterval != null) { window.clearInterval(sessionTimeoutInterval); }

				dispatch(AuthenticationCreators.AuthenticatingSuccess(refreshedToken));
				dispatch(AuthenticationCreators.ClearSessionTimeoutWarning());
			})
			.catch((error) => {
				dispatch(AuthenticationCreators.AuthenticatingFailure())
			})
	}
}

/** @function onAuthenticationFormChange
 * Is called when the login or forgot password form is changed.
 * 		 -Dispatches the FormChange Action.
 * 
 * @exports
 * @param  {string} field    	-The name of the changed field. 
 * @param  {string} value    	-The value of the changed field. 
 * @param  {boolean} isValid 	-If the field is valid.
 * 
 * @returns {function}		
 */
export function onAuthenticationFormChange(field: string, value: string, isValid: boolean): ThunkAction<void, StoreState, void, any> {
	return (dispatch: Dispatch<any>) => {
		dispatch(AuthenticationCreators.FormChange(field, value, isValid));
	}
}

/** @function onLogin
 * Is called when the user requests to be logged in.
 * 
 * Dispatches the LogginIn action, then dispatches the LoggedIn action
 * or LoginFailure action depending on the result of the call to the 
 * AuthenticationService.Login method.
 * 
 * @exports
 * @param  {string} username    	-The username of the requested login. 
 * @param  {string} password    	-The password of the requested login.
 * 
 * @returns {function} 
 */
export function onLogin(username: string, password: string): ThunkAction<void, StoreState, void, any> {
	return (dispatch: Dispatch<any>, getState: () => StoreState) => {
		dispatch(AuthenticationCreators.LoggingIn());
		console.log('loginResponsesssssssssss');
		AuthenticationService.Login(username, password, (expiresInSeconds: number) => handleSessionTimeoutWarning(dispatch, getState, expiresInSeconds))
			.then(
				(res: OktaToken) => {
					console.log('loginResponse', res);
					dispatch(push('/dashboard'));
					dispatch(AuthenticationCreators.LoggedIn(res));
					
				}
				
			)
			.catch((err: any) => {
				console.log('loginResponseqqqq');
				dispatch(AuthenticationCreators.LoginFailure());
			});

	}
}

/** @function onLogout
 * Is called when the user requests to be logged out.
 * 
 * Dispatches the LoggingOut action, then dispatches the LoggedOut action
 * or LogoutFailure action depending on the result of the call to the 
 * AuthenticationService.Logout method.
 * 
 * @exports
 * 
 * @returns {function} 
 */
export function onLogout(): ThunkAction<void, StoreState, void, any> {
	return (dispatch: Dispatch<any>, getState: () => StoreState) => {
		dispatch(AuthenticationCreators.LoggingOut());

		AuthenticationService.Logout()
			.then(() => {

				dispatch(AuthenticationCreators.LoggedOut());
				dispatch(AuthenticationCreators.ClearSessionTimeoutWarning());
				dispatch(push('/'));
			})
			.catch((err) => dispatch(AuthenticationCreators.LogoutFailure()));
	}
}


/** @function onCheckAuthentication
 * Is called when we need to check if the user is authenticated.
 * 
 * Dispatches the Authenticating action, then dispatches the AuthenticatingSuccess
 * action or AuthenticatingFailure action depending on the result of the call to the 
 * AuthenticationService.CheckAuthentication method.
 * 
 * @exports
 * 
 * @returns {function} 
 */
export function onCheckAuthentication(): ThunkAction<void, StoreState, void, any> {
	return (dispatch: Dispatch<any>, getState: () => StoreState) => {
		dispatch(AuthenticationCreators.Authenticating());

		return AuthenticationService.CheckAuthentication((expiresInSeconds) => handleSessionTimeoutWarning(dispatch, getState, expiresInSeconds))
			.then((res) => {
				dispatch(push('/dashboard'));
				dispatch(AuthenticationCreators.AuthenticatingSuccess(res));
			})
			.catch((err) => dispatch(AuthenticationCreators.AuthenticatingFailure()));
	}
}


/** @function onForgotPasswordToggle
 * Is called when the user requests that the forgot password and login forms 
 * be hidden or shown.
 * 
 * Dispatches the ForgotPasswordToggle action.
 * 
 * @exports
 * 
 * @returns {function} 
 */
export function onForgotPasswordToggle(): ThunkAction<void, StoreState, void, any> {
	return (dispatch: Dispatch<any>) => {
		return dispatch(AuthenticationCreators.ForgotPasswordToggle());
	}
}

/** @function onForgotPassword
 * Is called when the user requests that the forgot password and login forms 
 * be hidden or shown.
 * 
 * Dispatches the ForgotPasswordLoading action, then dispatches the ForgotPasswordSuccess
 * action or ForgotPasswordFailure action depending on the result of the call to the 
 * AuthenticationService.ForgotPassword method.
 * 
 * @exports
 * @param {string} username - The username of the user to send the forgot password reques to.
 * 
 * @returns {function} 
 */
export function onForgotPassword(username: string): ThunkAction<void, StoreState, void, any> {
	return (dispatch: Dispatch<any>) => {
		dispatch(AuthenticationCreators.ForgotPasswordLoading());

		return AuthenticationService.ForgotPassword(username)
			.then(() => dispatch(AuthenticationCreators.ForgotPasswordSuccess()))
			.catch((err) => dispatch(AuthenticationCreators.ForgotPasswordFailure()));
	}
}