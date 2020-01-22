
import * as OktaAuth from '@okta/okta-auth-js';
import * as moment from 'moment';
import Config from '../Config/Config';
import * as ReazoApi from '../ReazoApi/ReazoApi';
import { IOktaAuth, IOktaPasswordComplexity, OktaConfig, OktaCredentials, OktaOAuthOptions, OktaToken, OktaTransaction } from './types/OktaAuth';

export const oktaConfig: OktaConfig = {
	baseUri: Config.oktaBaseUri,
	clientId: Config.oktaClientId,
	issuer: Config.oktaIssuer,
	redirectUri: Config.oktaRedirectUri,
	url: Config.oktaUrl
};



const authClient: IOktaAuth = new OktaAuth(oktaConfig);

/** 
 * @function Login 
 * Attempt to verify the username and password combonation with Okta.
 * 
 * TODO: This method should handle the many other transaction.status values
 * from Okta.
 * 
 * @exports
 * @async
 * @param {string} username -The username to check.
 * @param {string} password -The password to check.
 * 
 * @return {string|null}
 * 	-Returns the idToken of the authenticated user or null if the authentication failed
 */
const Login = async (username: string, password: string, sessionTimeoutWarnCallback: (expiresInSeconds: number) => any): Promise<OktaToken | null> => {
	let transaction: (OktaTransaction | null) = null;
	let tokens: (OktaToken[] | null) = null;

	const credentials: OktaCredentials = { username: username, password: password };

	transaction = await authClient.signIn(credentials);

	if (transaction !== null && transaction.status === 'SUCCESS') {
		const oAuthOptions: OktaOAuthOptions = {
			sessionToken: transaction.sessionToken,
			responseType: ['id_token', 'token'],
			scopes: ['openid', 'email', 'profile'],
			redirect_uri: oktaConfig.redirectUri
		}

		tokens = await authClient.token.getWithoutPrompt(oAuthOptions);

		if (tokens) {
			authClient.tokenManager.add('idToken', tokens[0]);
			authClient.tokenManager.add('accessToken', tokens[1]);

			handleSessionTimeout(tokens[0].expiresAt, sessionTimeoutWarnCallback);

			return tokens[0];
		}
	}

	return null;
}

/** 
 * @function GetLoggedInUserToken 
 * Get the OktaToken for the currently logged in user. 
 * Returns null if no logged in user.
 *  
 * @exports
 * @async
 * 
 * @return {OktaToken} 	-Returns the idToken of the authenticated user.
 */

const GetLoggedInUserToken = async (): Promise<OktaToken | null> => {

	let session: any = null;
	let idToken: (OktaToken | null) = null;

	try {
		session = await authClient.session.get();
	}
	catch (err) {
		authClient.tokenManager.clear();
		return null;
	}

	idToken = await authClient.tokenManager.get('idToken');

	if (idToken && session) {

		if (session.status === 'INACTIVE') {
			authClient.tokenManager.clear();
			return null;
		}

		return idToken;

	}

	return null;

}

/** 
 * @function CheckAuthentication 
 * Checks to see if we have a session and idToken.
 *  
 * @exports
 * @async
 * 
 * @throws {TypeError} - Indicates there is not an active session.
 * 
 * @return {string} 	-Returns the idToken of the authenticated user.
 */
const CheckAuthentication = async (sessionTimeoutWarnCallback: (secondsToSessionExpires: number) => void): Promise<OktaToken> => {
	let session: any = null;
	let idToken: (OktaToken | null) = null;

	try {
		session = await authClient.session.get();
	}
	catch (err) {
		authClient.tokenManager.clear();
		throw TypeError('Not Authenticated');
	}

	idToken = await authClient.tokenManager.get('idToken');

	if (idToken && session) {

		if (session.status === 'INACTIVE') {
			authClient.tokenManager.clear();
			throw TypeError('Not Authenticated');
		}

		handleSessionTimeout(idToken.expiresAt, sessionTimeoutWarnCallback);
		return idToken;
	}

	authClient.tokenManager.clear();
	throw TypeError('Not Authenticated');
}

/** 
 * @function Logout 
 * Logs the user out of their current session.
 *  
 * @exports
 * @async
 * 
 * @throws {TypeError} - Indicates there was an error trying to logout.
 * 
 */
const Logout = async () => {

	const logoutResult = await authClient.signOut();

	if (logoutResult) { throw TypeError(logoutResult) };

	clearSessionTimeoutInterval();
	authClient.tokenManager.clear();
}

/** 
 * @function ForgotPassword 
 * Requests that Okta send a forgot password verification request by email.
 *  
 * @param {string} username 
 * 	The username of the user we want to send a reset password verification request to.
 * @exports
 * @async
 * 
 */
const ForgotPassword = async (username: string): Promise<void> => {
	const response = await authClient.forgotPassword({ username: username, factorType: 'EMAIL' });

	window.console.log(response);
}

/** 
 * @function VerifyResetPasswordToken 
 * Requests that Okta send a forgot password verification request by email.
 * 
 * TODO: This method could also handle other verification factor types like SMS.
 * @exports
 * @async
 * @param {string} token - The verification token to check.
 * 
 * @returns {string} - The security challenge question.
 * 
 */
const VerifyResetPasswordToken = async (token: string): Promise<string> => {
	const transaction = await authClient.verifyRecoveryToken({ recoveryToken: token });

	return transaction.user.recovery_question.question;
}

/** 
 * @typedef PasswordComplexity
 * @type {object}
 * @property {Number} 	minLength - Password minimum length.
 * @property {Number} 	minLowerCase - Required number of lowercase.
 * @property {Number} 	minUpperCase - Required number of uppercae.
 * @property {Number} 	minNumber - Required number of numerals.
 * @property {Number} 	minSymbol - Required number of symbols.
 * @property {boolean} 	excludeUsername - If the can contain the user's username.
 */

/** 
 * @function VerifySecurityQuestion 
 * Requests that Okta verify the anwser to the security challenge.
 *
 * @exports
 * @async
 * @param {string} anwser - The user's answer to the security challenge.
 * 
 * @throws {TypeError} - There is no reset password transaction in progress.
 * 
 * @returns {PasswordComplexity} - The password complexity rules.
 * 
 */
const VerifySecurityQuestion = async (anwser: string): Promise<IOktaPasswordComplexity> => {
	const transactionExists = authClient.tx.exists();

	if (transactionExists) {
		let transaction = await authClient.tx.resume();

		transaction = await transaction.answer({ answer: anwser });

		return transaction.policy.complexity;
	}

	throw TypeError('No transaction in progress.')

}

/** 
 * @function ResetPassword 
 * Requests that Okta resets the user's password.
 *
 * TODO: We should handle Okta rejecting the new password and throw
 * an appropriate error.
 * 
 * @exports
 * @async
 * @param {string} newPassword - The user's new password.
 * 
 * @throws {TypeError} 
 * 	The new password doesn't meet the Okta requirments. 
 *  Or there is no reset password transaction in progress.
 * 
 * @returns {true} - The user's password was successfully reset. 
 * 
 */
const ResetPassword = async (newPassword: string): Promise<boolean> => {
	const transactionExists = authClient.tx.exists();

	if (transactionExists) {
		let transaction = await authClient.tx.resume();
		transaction = await transaction.resetPassword({ newPassword: newPassword });

		return true;
	}

	throw TypeError('No transaction in progress.')
}

let sessionTimeoutInterval: number | undefined;

const handleSessionTimeout = (sessionExpires: number, callback: (secondsToSessionExpires: number) => void, warnThresholdSeconds: number = 60): void => {
	clearSessionTimeoutInterval();

	sessionTimeoutInterval = window.setInterval(() => {

		const now = moment();
		const warnThreshold = moment.unix(sessionExpires - warnThresholdSeconds);
		const expires = moment.unix(sessionExpires);

		const nowIsBetweenThresholdAndExires = now.isBetween(warnThreshold, expires);
		const nowIsAfterExpires = now.isSameOrAfter(expires);

		if (nowIsBetweenThresholdAndExires || nowIsAfterExpires) {
			let secondsToSessionExpires = -1;

			if (nowIsBetweenThresholdAndExires) {
				secondsToSessionExpires = expires.diff(now, 'seconds');
			}

			clearSessionTimeoutInterval();
			callback(secondsToSessionExpires);
		}

	}, 5000);
}

const clearSessionTimeoutInterval = (): void => { window.clearInterval(sessionTimeoutInterval); }

const RefreshSession = async (sesstionTimeoutWarnCallback: (secondsToSessionExpires: number) => void): Promise<OktaToken> => {

	let session = null;
	let idToken: (OktaToken | null) = null;

	try {
		session = await authClient.session.get();
	}
	catch (err) {
		authClient.tokenManager.clear();
		throw TypeError('Not Authenticated');
	}

	idToken = authClient.tokenManager.get('idToken');

	if (idToken && session) {
		const freshToken = await authClient.token.refresh(idToken)

		handleSessionTimeout(freshToken.expiresAt, sesstionTimeoutWarnCallback);

		return freshToken;
	}

	throw TypeError('Not Authenticated');
}

const VerifyUserId = async (userId: string): Promise<string> => {

	const response = await ReazoApi.VerifyUserId(userId);
	return response;
}

const GetPasswordComplexity = async (): Promise<IOktaPasswordComplexity> => {
	return await ReazoApi.GetPasswordComplexity();
}

const ChangePassword = async (userId: string,  oldPassword: string, newPassword: string): Promise<void> => {
	return await ReazoApi.ChangePassword(userId, oldPassword, newPassword);
}

const ChangeSecurityQuestion = async (userId: string, password: string, securityQuestion: string, securityAnswer: string): Promise<void> => {
	return await ReazoApi.ChangeSecurityQuestion(userId, password, securityQuestion, securityAnswer);
}

export default {
	oktaConfig,
	Login,
	Logout,
	CheckAuthentication,
	ForgotPassword,
	VerifyResetPasswordToken,
	VerifySecurityQuestion,
	ResetPassword,
	RefreshSession,
	GetLoggedInUserToken,
	VerifyUserId,
	GetPasswordComplexity,
	ChangePassword,
	ChangeSecurityQuestion
}