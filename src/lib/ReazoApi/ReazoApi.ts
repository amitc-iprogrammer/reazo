
import axios from 'axios';
import AuthenticationService from '../Authentication/AuthenticationService';
import { IOktaPasswordComplexity } from '../Authentication/types/OktaAuth';
import Config from '../Config/Config';

const baseApiUrl = Config.apiUrl;

const routes = {
	verifyUserIdRoute: 'verify-account-id',
	getPasswordComplexityRoute: 'get-password-complexity',
	changePasswordRoute: 'change-password',
	changeSecurityQuestionRoute: 'change-security-question'
}

const getAuthorizationHeaderValue = async (): Promise<string> => {

	const userToken = await AuthenticationService.GetLoggedInUserToken();

	if (userToken === null) {
		throw new TypeError('Not authenticated');
	}

	return `Bearer ${userToken.idToken}`;
}

export const GetPasswordComplexity = async (): Promise<IOktaPasswordComplexity> => {
	const response = await axios.get<IOktaPasswordComplexity>(
		`${baseApiUrl}/${routes.getPasswordComplexityRoute}`
	);

	return response.data;
}

export const VerifyUserId = async (accountId: string): Promise<string> => {

	const response = await axios.get<string>(
		`${baseApiUrl}/${routes.verifyUserIdRoute}/${accountId}`
	);

	return response.data;
}

export const ChangePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {

	await axios.post<void>(
		`${baseApiUrl}/${routes.changePasswordRoute}`,
		{ userId, oldPassword, newPassword }
	);
}

export const ChangeSecurityQuestion = async (userId: string, password: string, securityQuestion: string, securityAnswer: string): Promise<void> => {

	await axios.post<void>(
		`${baseApiUrl}/${routes.changeSecurityQuestionRoute}`,
		{ userId, password, securityQuestion, securityAnswer }
	);
}


export const test = async (): Promise<string> => {

	try {
		const response = await axios.get<string>(
			`${baseApiUrl}/test`,
			{
				headers: {
					'Authorization': await getAuthorizationHeaderValue()
				}
			}
		);
		return response.data;
	}
	catch (error) {
		window.console.log(error);
		return 'damn';
	}

}
