import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import StoreState from 'src/reducers/types/StoreState';
import * as ResetPasswordCreators from '../creators/ResetPasswordCreators';
import AuthenticationService from '../lib/Authentication/AuthenticationService';

/** 
 * @function onVerifyToken
 * Is called when we need to check the validity of the reset password token.
 * 
 * Dispatches the VerifyTokenLoading action, then dispatches the VerifyTokenSuccess action
 * or VerifyTokenFailure action depending on the result of the call to the 
 * AuthenticationService.VerifyResetPasswordToken method.
 * 
 * @exports
 * @param  {string} token    	-The verify password token. 
 * 
 * @returns {function} 
 */
export const onVerifyToken = (token: string): ThunkAction<void, StoreState, void, any> => {
	return (dispatch: Dispatch<any>) => {
		dispatch(ResetPasswordCreators.VerifyTokenLoading());

		AuthenticationService.VerifyResetPasswordToken(token)
			.then((res: string) => dispatch(ResetPasswordCreators.VerifyTokenSuccess(res)))
			.catch((err) => dispatch(ResetPasswordCreators.VerifyTokenFailure()));
	}
}

/** 
 * @function onVerifySecurityQuestion
 * Is called when we need to check the validity of the reset password token.
 * 
 * Dispatches the VerifySecurityQuestionLoading action, then dispatches the 
 * VerifySecurityQuestionSuccess action or VerifySecurityQuestionFailure action 
 * depending on the result of the call to the AuthenticationService.VerifySecurityQuestion method.
 * 
 * @exports
 * @param  {string} answer    	-The user's answer to the security challenge.
 * 
 * @returns {function} 
 */
export const onVerifySecurityQuestion = (answer: string): ThunkAction<void, StoreState, void, any> => {
	return (dispatch: Dispatch<any>) => {
		dispatch(ResetPasswordCreators.VerifySecurityQuestionLoading());

		AuthenticationService.VerifySecurityQuestion(answer)
			.then((res) => dispatch(ResetPasswordCreators.VerifySecurityQuestionSuccess(res)))
			.catch((err) => dispatch(ResetPasswordCreators.VerifySecurityQuestionFailure()));
	}
}

/**
 *  @function onSecurityQuestionFormChange
 * Is called when the security question form has changed.
 * 
 * Dispatches the SecurityQuestionFormChange action.
 * 
 * @exports
 * @param  {string} field    
 *         The name of the changed field. 
 * @param  {string} value    
 *         The value of the changed field. 
 * @param  {boolean} isValid    
 *         If the field is valid.
 *  
 * @returns {function} 
 */
export const onSecurityQuestionFormChange =
	(field: string, value: string, isValid: boolean): ThunkAction<void, StoreState, void, any> => {
		return (dispatch: Dispatch<any>) => {
			dispatch(ResetPasswordCreators.SecurityQuestionFormChange(field, value, isValid));
		}
	}
/** 
 * @function onChangePasswordFormChange
 * Is called when the change password form has changed.
 * 
 * Dispatches the ChangePasswordFormChange action.
 * 
 * @exports
 * @param  {string} field    
 *         The name of the changed field. 
 * @param  {string} value    
 *         The value of the changed field. 
 * @param  {boolean} isValid    
 *         If the field is valid.
 * 
 * @returns {function} 
 */
export const onChangePasswordFormChange =
	(field: string, value: string, isValid: boolean): ThunkAction<void, StoreState, void, any> => {
		return (dispatch: Dispatch<any>) => {
			dispatch(ResetPasswordCreators.ChangePasswordFormChange(field, value, isValid));
		}
	}

/** 
 * @function onChangePassword
 * Is called, after the password reset token and security challege have been verified, to reset the user's password.
 * 
 * Dispatches the ChangePasswordLoading action, then dispatches the 
 * ChangePasswordSuccess action or ChangePasswordFailure action 
 * depending on the result of the call to the AuthenticationService.ResetPassword method.
 * 
 * @exports
 * @param  {string} answer    	-The user's answer to the security challenge.
 * 
 * @returns {function} 
 */
export const onChangePassword = (newPassword: string): ThunkAction<void, StoreState, void, any> => {
	return (dispatch: Dispatch<any>) => {
		dispatch(ResetPasswordCreators.ChangePasswordLoading());

		AuthenticationService.ResetPassword(newPassword)
			.then((res) => dispatch(ResetPasswordCreators.ChangePasswordSuccess()))
			.catch((err) => dispatch(ResetPasswordCreators.ChangePasswordFailure()));
	}
}