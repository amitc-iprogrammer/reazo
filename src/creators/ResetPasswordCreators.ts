import { ResetPasswordCreators } from "./types/ResetPasswordCreators";

/**
 * @file Provides Redux actions for the Reset Password flow.
 * @author James W Cramer
 */

/**
 * @readonly
 * @export
 * @typedef ResetPasswordActionTypes
 * @type {object}
 * @property {string}	VerifyTokenLoading				-We are verifying the reset password token.
 * @property {string}	VerifyTokenSuccess				-The reset password token was verified.
 * @property {string}	VerifyTokenFailure				-The reset password token was invalid.
 * @property {string}	VerifySecurityQuestionLoading	-We are attempting to verify the user's security answer.
 * @property {string}	VerifySecurityQuestionSuccess	-We have successfully verifyed the user's security question.
 * @property {string}	VerifySecurityQuestionFailure	-The user's security answer could not be verify.
 * @property {string}	ChangePasswordLoading			-We are in the process of attempting to changes the user's password.
 * @property {string}	ChangePasswordSuccess			-The user's password has been changed
 * @property {string}	ChangePasswordFailure			-The attempt to change user's password failed.
 * @property {string}	SecurityQuestionFormChange		-The security question form has changed.
 * @property {string}	ChangePasswordFormChange		-The change password form has changed. 
 */
export const ResetPasswordActionTypes =
	{
		VerifyTokenLoading: 'VERIFY_TOKEN_LOADING',
		VerifyTokenSuccess: 'VERIFY_TOKEN_SUCCESS',
		VerifyTokenFailure: 'VERIFY_TOKEN_FAILURE',
		VerifySecurityQuestionLoading: 'VERIFY_SECURITY_QUESTION_LOADING',
		VerifySecurityQuestionSuccess: 'VERIFY_SECURITY_QUESTION_SUCCESS',
		VerifySecurityQuestionFailure: 'VERIFY_SECURITY_QUESTION_FAILURE',
		ChangePasswordLoading: 'CHANGE_PASSWORD_LOADING',
		ChangePasswordSuccess: 'CHANGE_PASSWORD_SUCCESS',
		ChangePasswordFailure: 'CHANGE_PASSWORD_FAILURE',
		SecurityQuestionFormChange: 'SECURITY_QUESTION_FORM_CHANGE',
		ChangePasswordFormChange: 'CHANGE_PASSWORD_FORM_CHANGE'
	}

/** @function VerifyTokenLoading
 * We are verifying the reset password token.
 * 
 * @returns {{type: string}} 
 * 			ResetPasswordActionTypes.VerifyTokenLoading
 */
export const VerifyTokenLoading: ResetPasswordCreators.VerifyTokenLoadingCreator =
	(): ResetPasswordCreators.VerifyTokenLoading => {
		return { type: ResetPasswordActionTypes.VerifyTokenLoading };
	}

/**	@typedef VerifyTokenSuccessAction
 * @type {object}
 * @property {string}	type 				- ResetPasswordActionTypes.VerifyTokenSuccess					
 * @property {string}	securityQuestion	- The user's security question.			
 */

/** @function VerifyTokenSuccess
 * The reset password token was verified.
 * 
 * @param  {string} securityQuestion   - The user's security question.
 * 
 * @returns {VerifyTokenSuccessAction}
 */
export const VerifyTokenSuccess: ResetPasswordCreators.VerifyTokenSuccessCreator =
	(securityQuestion: string): ResetPasswordCreators.VerifyTokenSuccess => {
		return {
			type: ResetPasswordActionTypes.VerifyTokenSuccess,
			securityQuestion: securityQuestion
		};
	}

/** @function VerifyTokenFailure
 * The reset password token was invalid.
 * 
 * @returns {{type: string}} 
 * 			ResetPasswordActionTypes.VerifyTokenFailure
 */
export const VerifyTokenFailure: ResetPasswordCreators.VerifyTokenFailureCreator =
	(): ResetPasswordCreators.VerifyTokenFailure => {
		return { type: ResetPasswordActionTypes.VerifyTokenFailure };
	}

/** @function VerifySecurityQuestionLoading
 * We are attempting to verify the user's security answer.
 * 
 * @returns {{type: string}} 
 * 			ResetPasswordActionTypes.VerifySecurityQuestionLoading
 */
export const VerifySecurityQuestionLoading: ResetPasswordCreators.VerifySecurityQuestionLoadingCreator =
	(): ResetPasswordCreators.VerifySecurityQuestionLoading => {
		return { type: ResetPasswordActionTypes.VerifySecurityQuestionLoading }
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

/**	@typedef VerifySecurityQuestionSuccessAction
 * @type {object}
 * @property {string}				type 		 - ResetPasswordActionTypes.VerifySecurityQuestionSuccess					
 * @property {PasswordComplexity}	complexity	 - The password complexity rules.		
 */

/** @function VerifySecurityQuestionSuccess
 * We have successfully verifyed the user's security question.
 * 
 * @param  {PasswordComplexity} passwordComplexity   - The password complexity rules.
 * 
 * @returns {VerifySecurityQuestionSuccessAction}
 */
export const VerifySecurityQuestionSuccess: ResetPasswordCreators.VerifySecurityQuestionSuccessCreator =
	(passwordComplexity: ResetPasswordCreators.PasswordComplexity): ResetPasswordCreators.VerifySecurityQuestionSuccess => {
		return {
			type: ResetPasswordActionTypes.VerifySecurityQuestionSuccess,
			complexity: passwordComplexity
		};
	}

/** @function VerifySecurityQuestionFailure
 * The user's security answer could not be verified.
 * 
 * @returns {{type: string}} 
 * 			ResetPasswordActionTypes.VerifySecurityQuestionFailure
 */
export const VerifySecurityQuestionFailure: ResetPasswordCreators.VerifySecurityQuestionFailureCreator =
	(): ResetPasswordCreators.VerifySecurityQuestionFailure => {
		return { type: ResetPasswordActionTypes.VerifySecurityQuestionFailure };
	}

/** @function ChangePasswordLoading
 * We are in the process of attempting to changes the user's password.
 * 
 * @returns {{type: string}} 
 * 			ResetPasswordActionTypes.ChangePasswordLoading
 */
export const ChangePasswordLoading: ResetPasswordCreators.ChangePasswordLoadingCreator =
	(): ResetPasswordCreators.ChangePasswordLoading => {
		return { type: ResetPasswordActionTypes.ChangePasswordLoading };
	}

/** @function ChangePasswordSuccess
 * The user's password has been changed.
 * 
 * @returns {{type: string}} 
 * 			ResetPasswordActionTypes.ChangePasswordSuccess
 */
export const ChangePasswordSuccess: ResetPasswordCreators.ChangePasswordSuccessCreator =
	(): ResetPasswordCreators.ChangePasswordSuccess => {
		return { type: ResetPasswordActionTypes.ChangePasswordSuccess };
	}

/** @function ChangePasswordFailure
 * The attempt to change user's password failed.
 * 
 * @returns {{type: string}} 
 * 			ResetPasswordActionTypes.ChangePasswordFailure
 */
export const ChangePasswordFailure: ResetPasswordCreators.ChangePasswordFailureCreator =
	(): ResetPasswordCreators.ChangePasswordFailure => {
		return { type: ResetPasswordActionTypes.ChangePasswordFailure };
	}

/**	
 * @typedef SecurityQuestionFormChangeAction
 * @type {object}
 * @property {string}	type 		- ResetPasswordActionTypes.SecurityQuestionFormChange					
 * @property {string}	field		- The name of the changed field. 			
 * @property {string}	value		- The value of the changed field. 		
 * @property {boolean}	isValid		- If the field is valid.		
 */

/** @function SecurityQuestionFormChange
 * The security question form has changed. 
 * 
 * @param  {string} field    
 *         The name of the changed field. 
 * @param  {string} value    
 *         The value of the changed field. 
 * @param  {boolean} isValid    
 *         If the field is valid.
 * 
 * @returns {SecurityQuestionFormChangeAction}
 */
export const SecurityQuestionFormChange: ResetPasswordCreators.SecurityQuestionFormChangeCreator = 
(field: string, value: string, isValid: boolean): ResetPasswordCreators.SecurityQuestionFormChange => {
	return {
		type: ResetPasswordActionTypes.SecurityQuestionFormChange,
		field: field,
		value: value,
		isValid: isValid
	};
}

/**	@typedef ChangePasswordFormChangeAction
 * @type {object}
 * @property {string}	type 		- ResetPasswordActionTypes.ChangePasswordFormChange					
 * @property {string}	field		- The name of the changed field. 			
 * @property {string}	value		- The value of the changed field. 		
 * @property {boolean}	isValid		- If the field is valid.		
 */

/** @function ChangePasswordFormChange
 * The change password form has changed. 
 * 
 * @param  {string} field    
 *         The name of the changed field. 
 * @param  {string} value    
 *         The value of the changed field. 
 * @param  {boolean} isValid    
 *         If the field is valid.
 * 
 * @returns {SecurityQuestionFormChangeAction}
 */
export const ChangePasswordFormChange: ResetPasswordCreators.ChangePasswordFormChangeCreator = 
(field: string, value: string, isValid: boolean): ResetPasswordCreators.ChangePasswordFormChange => {
	return {
		type: ResetPasswordActionTypes.ChangePasswordFormChange,
		field: field,
		value: value,
		isValid: isValid
	};
}
