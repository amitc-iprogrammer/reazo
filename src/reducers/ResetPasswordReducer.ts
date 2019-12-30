/**
 * @file Provides Redux state for Reset Password related data.
 * @author James W Cramer
 */

import { Reducer } from 'redux'
import { ResetPasswordActionTypes } from '../creators/ResetPasswordCreators'
import { ResetPasswordCreators } from '../creators/types/ResetPasswordCreators';

/**
 * @typedef FormField
 * @type {object}
 * 
 * @property {string} value 	-The value of the field
 * @property {bool} isValid 	-If the field is valid
 * @property {bool} touched		-If the field has been modified
 */

/** 
 * @typedef PasswordComplexity
 * @type {object}
 * @property {Number} 	minLength - Password minimum length.
 * @property {Number} 	minLowerCase - Required number of lowercase.
 * @property {Number} 	minUpperCase - Required number of uppercae.
 * @property {Number} 	minNumber - Required number of numerals.
 * @property {Number} 	minSymbol - Required number of symbols.
 * @property {boolean} 	excludeUsername - If the password can contain the user's username.
 */

/**
 * @typedef SecurityQuestionForm
 * @type {object}
 * 
 * @property {FormField} anwser - The user's answer to their security question
 */

/**
 * @typedef ChangePasswordForm
 * @type {object}
 * 
 * @property {FormField} newPassword 		- The user's new password
 * @property {FormField} confirmPassword 	- The user's new password confirmation
 */

/**
 * @typedef VerifyTokenState
 * @type {object}
 * 
 * @property {boolean} loading - The token is in the process of being verified
 * @property {boolean} success - The token was successfully verified
 * @property {boolean} error 	- The token was invalid or another error occured verifing the token
 */

/**
 * @typedef SecurityQuestionState
 * @type {object}
 * 
 * @property {string}  question	- The user's security question
 * @property {boolean} loading 	- The security question answer is in the process of being verified
 * @property {boolean} success 	- The security question answer was successfully verified
 * @property {boolean} error 		- The security question answer was invalid, or another error occured verifing the token
 */

/**
 * @typedef ChangePasswordState
 * @type {object}
 * 
 * @property {boolean} 				loading 	- The password change operation is in progress
 * @property {boolean} 				success 	- The user's password was successfully changed.
 * @property {boolean}				error 		- The user's new password didn't meet the criteria, or another error occured. 
 * @property {PasswordComplexity} 	complexity	- The password complexity rules.
 */

/**
 * @typedef ResetPasswordState
 * @type {object}
 * 
 * @property {SecurityQuestionForm} 	securityQuestionForm
 * 	The state of the security question form.
 * @property {VerifyTokenState} 		verifyToken
 * 	The state of the verify token process.
 * @property {SecurityQuestionState} 	securityQuestion
 * 	The state of the security challenge process.
 * @property {ChangePasswordState} 		changePassword
 */

/**
 * The initial state of the Reset Password Reducer.
 * @var {ResetPasswordState} initialState
 */
const initialState: ResetPassswordReducerState = {
	securityQuestionForm: {
		answer: { value: '', isValid: true, touched: false }
	},
	changePasswordForm: {
		newPassword: { value: '', isValid: true, touched: false },
		confirmPassword: { value: '', isValid: true, touched: false }
	},
	verifyToken: {
		loading: false,
		success: false,
		error: false
	},
	securityQuestion: {
		question: '',
		loading: false,
		success: false,
		error: false
	},
	changePassword: {
		loading: false,
		success: false,
		error: false,
		complexity: {
			excludeUsername: true,
			minLength: 0,
			minLowerCase: 0,
			minNumber: 0,
			minSymbol: 0,
			minUpperCase: 0
		}
	}
};

/**
 * @function handleVerifyTokenLoading
 * This method sets the state to indicate that we are waiting for the
 * verify token process to complete.
 * 
 * @param {ResetPasswordState} 	state 
 * @param {{type: string}} 		action  - ResetPasswordActionTypes.VerifyTokenLoading  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleVerifyTokenLoading =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.VerifyTokenLoading): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...state.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { loading: true, success: false, error: false },
			securityQuestion: { ...state.securityQuestion },
			changePassword: { ...state.changePassword }
		};
	}

/**	@typedef VerifyTokenSuccessAction
 * @type {object}
 * @property {string}	type 				- ResetPasswordActionTypes.VerifyTokenSuccess					
 * @property {string}	securityQuestion	- The user's security question.			
 */

/**
 * @function handleVerifyTokenSuccess
 * This method sets the state to indicate that the password reset token
 * was verified sucessfully.
 * 
 * @param {ResetPasswordState} 			state 
 * @param {VerifyTokenSuccessAction}	action  - ResetPasswordActionTypes.VerifyTokenLoading  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleVerifyTokenSuccess =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.VerifyTokenSuccess): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...state.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { loading: false, success: true, error: false },
			securityQuestion: { loading: false, success: false, error: false, question: action.securityQuestion },
			changePassword: { ...state.changePassword }
		};

	}

/**
 * @function handleVerifyTokenFailure
 * This method sets the state to indicate we could not verify the password reset token.
 * 
 * @param {ResetPasswordState} 	state 
 * @param {{type: string}} 		action  - ResetPasswordActionTypes.VerifyTokenFailure  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleVerifyTokenFailure =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.VerifyTokenFailure): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...state.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { loading: false, success: false, error: true },
			securityQuestion: { ...state.securityQuestion },
			changePassword: { ...state.changePassword }
		};
	}

/**
 * @function handleVerifySecurityQuestionLoading
 * This method sets the state to indicate that we are in the process of verifying 
 * the user's anwser to their security challenge question.
 * 
 * @param {ResetPasswordState} 	state 
 * @param {{type: string}} 		action  - ResetPasswordActionTypes.VerifySecurityQuestionLoading  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleVerifySecurityQuestionLoading =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.VerifySecurityQuestionLoading): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...initialState.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion, loading: true, success: false, error: false },
			changePassword: { ...state.changePassword }
		}
	}

/**	@typedef VerifySecurityQuestionSuccessAction
 * @type {object}
 * @property {string}				type 			- ResetPasswordActionTypes.VerifySecurityQuestionSuccess					
 * @property {PasswordComplexity}	complexity	 	- The password complexity rules.		
 */

/**
 * @function handleVerifySecurityQuestionSuccess
 * This method sets the state to indicate that we have verified the user's
 * password challenge answer and they can now change their password.
 * 
 * @param {ResetPasswordState} 					state 
 * @param {VerifySecurityQuestionSuccessAction} action
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleVerifySecurityQuestionSuccess =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.VerifySecurityQuestionSuccess): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...initialState.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion, loading: false, success: true, error: false },
			changePassword: { ...state.changePassword, complexity: { ...action.complexity } }
		}
	}

/**
 * @function handleVerifySecurityQuestionFailure
 * This method sets the state to indicate that we were unable to verify
 * the user's anwser to their security question
 * 
 * @param {ResetPasswordState} 	state 
 * @param {{type: string}} 		action  - ResetPasswordActionTypes.VerifySecurityQuestionFailure  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleVerifySecurityQuestionFailure =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.VerifySecurityQuestionFailure): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...initialState.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion, loading: false, success: false, error: true },
			changePassword: { ...state.changePassword }
		}
	}

/**
 * @function handleVerifySecurityQuestionFailure
 * This method sets the state to indicate that we are in the process of attempting
 * to change the user's password.
 * 
 * @param {ResetPasswordState} 	state 
 * @param {{type: string}} 		action  - ResetPasswordActionTypes.ChangePasswordLoading  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleChangePasswordLoading =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.ChangePasswordLoading): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...initialState.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion },
			changePassword: { ...state.changePassword, loading: true, success: false, error: false }
		}
	}

/**
 * @function handleChangePasswordSuccess
 * This method sets the state to indicate that we have successfully changed the user's password.
 * 
 * @param {ResetPasswordState} 	state 
 * @param {{type: string}} 		action  - ResetPasswordActionTypes.ChangePasswordSuccess  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleChangePasswordSuccess =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.ChangePasswordSuccess): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...initialState.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion },
			changePassword: { ...state.changePassword, loading: false, success: true, error: false }
		}
	}

/**
 * @function handleChangePasswordFailure
 * This method sets the state to indicate that we were unable to change 
 * the user's password because the password didn't meet the requirments, 
 * or another error occured..
 * 
 * @param {ResetPasswordState} 	state 
 * @param {{type: string}} 		action  - ResetPasswordActionTypes.ChangePasswordFailure  
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleChangePasswordFailure =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.ChangePasswordFailure): ResetPassswordReducerState => {

		return {
			securityQuestionForm: { ...initialState.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion },
			changePassword: { ...state.changePassword, loading: false, success: false, error: true }
		}
	}

/**
 * @typedef FormChangeAction
 * @type {object}
 * @property {string}	type 		
 * ResetPasswordActionTypes.SecurityQuestionFormChange OR
 * ResetPasswordActionTypes.ChangePasswordFormChange				
 * @property {string}	field		- The name of the changed field. 			
 * @property {string}	value		- The value of the changed field. 		
 * @property {boolean}	isValid		- If the field is valid.		
 */

/**
 * @function handleSecurityQuestionFormChange
 * This method sets the state to reflect changes to the security question form.
 * 
 * @param {ResetPasswordState} state 
 * @param {FormChangeAction} action 
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleSecurityQuestionFormChange =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.SecurityQuestionFormChange): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...state.securityQuestionForm, [action.field]: { value: action.value, isValid: action.isValid, touched: true } },
			changePasswordForm: { ...state.changePasswordForm },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion },
			changePassword: { ...state.changePassword }
		};
	}

/**
 * @function handleSecurityQuestionFormChange
 * This method sets the state to reflect changes to the change password form.
 * 
 * @param {ResetPasswordState} state 
 * @param {FormChangeAction} action 
 * 
 * @returns {ResetPasswordState} The mutated state.
 */
const handleChangePasswordFormChange =
	(state: ResetPassswordReducerState, action: ResetPasswordCreators.ChangePasswordFormChange): ResetPassswordReducerState => {
		return {
			securityQuestionForm: { ...state.securityQuestionForm },
			changePasswordForm: { ...state.changePasswordForm, [action.field]: { value: action.value, isValid: action.isValid, touched: true } },
			verifyToken: { ...state.verifyToken },
			securityQuestion: { ...state.securityQuestion },
			changePassword: { ...state.changePassword }
		};
	}

/**
 * Maps the handler methods to the ResetPasswordActionTypes
 * @var {object} handlers
 */
const handlers =
	{
		[ResetPasswordActionTypes.VerifyTokenLoading]: handleVerifyTokenLoading,
		[ResetPasswordActionTypes.VerifyTokenSuccess]: handleVerifyTokenSuccess,
		[ResetPasswordActionTypes.VerifyTokenFailure]: handleVerifyTokenFailure,

		[ResetPasswordActionTypes.VerifySecurityQuestionLoading]: handleVerifySecurityQuestionLoading,
		[ResetPasswordActionTypes.VerifySecurityQuestionSuccess]: handleVerifySecurityQuestionSuccess,
		[ResetPasswordActionTypes.VerifySecurityQuestionFailure]: handleVerifySecurityQuestionFailure,

		[ResetPasswordActionTypes.ChangePasswordLoading]: handleChangePasswordLoading,
		[ResetPasswordActionTypes.ChangePasswordSuccess]: handleChangePasswordSuccess,
		[ResetPasswordActionTypes.ChangePasswordFailure]: handleChangePasswordFailure,

		[ResetPasswordActionTypes.SecurityQuestionFormChange]: handleSecurityQuestionFormChange,
		[ResetPasswordActionTypes.ChangePasswordFormChange]: handleChangePasswordFormChange
	};

/**
 * @function ResetPasswordReducer
 * This method is the reducer passed to redux that will respond to all 
 * Reset Password actions.
 * 
 * @exports
 * @see /src/creators/ResetPasswordCreators
 * 
 * @param {ResetPasswordState} state 
 * @param {{ type: string }|VerifySecurityQuestionSuccessAction|FormChangeAction|VerifyTokenSuccessAction} action 
 * 
 * @returns {ResetPasswordState} 
 * 	The initial state if there is no current state, the mutated state if an action 
 * 	was handled, or the current state if the argument action was not handled.
 */
const ResetPasswordReducer: Reducer<ResetPassswordReducerState> =
	(state: ResetPassswordReducerState = initialState, action: ResetPasswordCreators.Actions): ResetPassswordReducerState => {
		if (action && action.type && handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		}
		else {
			return state;
		}
	}

export default ResetPasswordReducer
