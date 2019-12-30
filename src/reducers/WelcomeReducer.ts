import { Reducer } from 'redux';
import { WelcomeCreators } from 'src/creators/types/WelcomeCreators';
import { WelcomeActionTypes } from 'src/creators/WelcomeCreators';
import { CompareDataTypes, CompareOperators, ValidationTypes } from 'src/lib/Validation';
import { WelcomeReducerState } from './types/WelcomeReducerState';

const securityQuestionOptions: Array<{ value: string, text: string }> = [
	{ text: "What is the food you least liked as a child?", value: "What is the food you least liked as a child?" },
	{ text: "What is the name of your first stuffed animal?", value: "What is the name of your first stuffed animal?" },
	{ text: "What did you earn your first medal or award for?", value: "What did you earn your first medal or award for" },
	{ text: "What is your favorite security question?", value: "What is your favorite security question?" },
	{ text: "What is the toy/stuffed animal you liked the most as a kid?", value: "What is the toy/stuffed animal you liked the most as a kid?" },
	{ text: "What was the first computer game you played?", value: "What was the first computer game you played?" },
	{ text: "What is your favorite movie quote?", value: "What is your favorite movie quote?" },
	{ text: "What was the mascot of the first sports team you played on?", value: "What was the mascot of the first sports team you played on?" },
	{ text: "What music album or song did you first purchase?", value: "What music album or song did you first purchase?" },
	{ text: "What is your favorite piece of art?", value: "What is your favorite piece of art?" },
	{ text: "What was your grandmother's favorite dessert?", value: "What was your grandmother's favorite dessert?" },
	{ text: "What was the first thing you learned to cook?", value: "What was the first thing you learned to cook?" },
	{ text: "What was your dream job as a child?", value: "What was your dream job as a child?" },
	{ text: "Where did you meet your spouse/significant other?", value: "Where did you meet your spouse/significant other?" },
	{ text: "Where did you go for your favorite vacation?", value: "Where did you go for your favorite vacation?" },
	{ text: "Where were you on New Year's Eve in the year 2000?", value: "Where were you on New Year's Eve in the year 2000?" },
	{ text: "Who is your favorite speaker/orator?", value: "Who is your favorite speaker/orator?" },
	{ text: "Who is your favorite book/movie character?", value: "Who is your favorite book/movie character?" },
	{ text: "Who is your favorite sports player?", value: "Who is your favorite sports player?" }
]

const initialState: WelcomeReducerState = {
	verifyUserId: {
		loading: false,
		success: false,
		error: false,
		accountLogin: null,
		userId: null,
		passwordComplexity: {
			excludeUsername: true,
			minLength: 8,
			minLowerCase: 1,
			minNumber: 1,
			minSymbol: 0,
			minUpperCase: 0
		}
	},
	setPasswordForm: {
		id: 'setPasswordForm',
		complete: false,
		error: false,
		errorMessage: '',
		loading: false,
		fields: {
			oldPassword: { id: 'oldPassword', value: null, error: false, touched: false, validation: { required: true } },
			newPassword: { id: 'newPassword', value: null, error: false, touched: false, validation: { required: true } },
			confirmNewPassword: {
				id: 'confirmNewPassword',
				value: null,
				error: false,
				touched: false,
				validation: {
					required: true,
					validators: {
						type: ValidationTypes.Compare as ValidatorType,
						options: {
							dataType: CompareDataTypes.String,
							operator: CompareOperators.Equal,
							compareValue: null
						}
					}
				}
			}
		}
	},
	setSecurityQuestion: {
		id: 'setSecurityQuestion',
		complete: false,
		error: false,
		errorMessage: '',
		loading: false,
		fields: {
			securityQuestion: { id: 'securityQuestion', value: null, error: false, touched: false, options: securityQuestionOptions, validation: { required: true } },
			securityAnswer: {
				id: 'securityAnswer',
				value: null,
				error: false,
				touched: false,
				validation: {
					required: true,
					validators: {
						type: ValidationTypes.MinimumLength as ValidatorType,
						options: { length: 4 }
					}
				}
			}
		}
	}
}

const handleVerifyUserIdLoading =
	(state: WelcomeReducerState, action: WelcomeCreators.VerifyUserIdLoading): WelcomeReducerState => {
		return {
			...state,
			verifyUserId: { ...state.verifyUserId, loading: true, success: false, error: false, accountLogin: null }
		};
	}


const handleSetUserId =
	(state: WelcomeReducerState, action: WelcomeCreators.SetUserId): WelcomeReducerState => (
		{
			...state,
			verifyUserId: {
				...state.verifyUserId,
				userId: action.userId
			}
		}
);

const handleVerifyUserIdSuccess =
	(state: WelcomeReducerState, action: WelcomeCreators.VerifyUserIdSuccess): WelcomeReducerState => {
		return {
			...state,
			verifyUserId: {
				...state.verifyUserId,
				loading: false,
				success: true,
				error: false,
				accountLogin: action.accountLogin,
				passwordComplexity: action.passwordComplexity
			}
		};
	}

const handleVerifyUserIdFailure =
	(state: WelcomeReducerState, action: WelcomeCreators.VerifyUserIdFailure): WelcomeReducerState => {
		return {
			...state,
			verifyUserId: { ...state.verifyUserId, loading: false, success: false, error: true, accountLogin: null }
		};
	}

const handleFormChange =
	(state: WelcomeReducerState, action: WelcomeCreators.FormChange): WelcomeReducerState => {
		return {
			...state,
			[action.formId]: {
				...state[action.formId],
				fields: {
					...state[action.formId].fields,
					[action.fieldId]: {
						...state[action.formId].fields[action.fieldId],
						value: action.value,
						error: action.error,
						touched: true
					}
				}
			}
		};
	}

const handleSetPasswordValidators =
	(state: WelcomeReducerState, action: WelcomeCreators.SetPasswordValidators): WelcomeReducerState => (
		{
			...state,
			setPasswordForm: {
				...state.setPasswordForm,
				fields: {
					...state.setPasswordForm.fields,
					newPassword: {
						...state.setPasswordForm.fields.newPassword,
						validation: {
							...state.setPasswordForm.fields.newPassword.validation,
							validators: action.validators
						}
					}
				}
			}
		}

	)
const handleSetConfirmPasswordValidatorCompareValue =
	(state: WelcomeReducerState, action: WelcomeCreators.SetConfirmPasswordValidatorCompareValue): WelcomeReducerState => (
		{
			...state,
			setPasswordForm: {
				...state.setPasswordForm,
				fields: {
					...state.setPasswordForm.fields,
					confirmNewPassword: {
						...state.setPasswordForm.fields.confirmNewPassword,
						validation: {
							...state.setPasswordForm.fields.confirmNewPassword.validation,
							validators: {
								type: ValidationTypes.Compare as ValidatorType,
								options: {
									dataType: CompareDataTypes.String,
									operator: CompareOperators.Equal,
									compareValue: state.setPasswordForm.fields.newPassword.value
								}
							}
						}
					}
				}
			}
		}

	)

const handleSetFormError =
	(state: WelcomeReducerState, action: WelcomeCreators.SetFormError): WelcomeReducerState => (
		{
			...state,
			[action.formId]: {
				...state[action.formId],
				error: true,
				errorMessage: action.errorMessage
			}
		}
	)

const handleClearFormError =
	(state: WelcomeReducerState, action: WelcomeCreators.ClearFormError): WelcomeReducerState => (
		{
			...state,
			[action.formId]: {
				...state[action.formId],
				error: false,
				errorMessage: ''
			}
		}
	)


const handleSetFormLoading =
	(state: WelcomeReducerState, action: WelcomeCreators.SetFormLoading): WelcomeReducerState => (
		{
			...state,
			[action.formId]: {
				...state[action.formId],
				loading: action.loading
			}
		}
	)

	const handleSetFormComplete =
	(state: WelcomeReducerState, action: WelcomeCreators.SetFormComplete): WelcomeReducerState => (
		{
			...state,
			[action.formId]: {
				...state[action.formId],
				complete: action.complete
			}
		}
	)
	




const handlers =
{
	[WelcomeActionTypes.VerifyUserIdLoading]: handleVerifyUserIdLoading,
	[WelcomeActionTypes.VerifyUserIdSuccess]: handleVerifyUserIdSuccess,
	[WelcomeActionTypes.VerifyUserIdFailure]: handleVerifyUserIdFailure,
	[WelcomeActionTypes.FormChange]: handleFormChange,
	[WelcomeActionTypes.SetPasswordValidators]: handleSetPasswordValidators,
	[WelcomeActionTypes.SetConfirmPasswordValidatorCompareValue]: handleSetConfirmPasswordValidatorCompareValue,
	[WelcomeActionTypes.SetFormError]: handleSetFormError,
	[WelcomeActionTypes.ClearFormError]: handleClearFormError,
	[WelcomeActionTypes.SetFormLoading]: handleSetFormLoading,
	[WelcomeActionTypes.SetUserId]: handleSetUserId,
	[WelcomeActionTypes.SetFormComplete]: handleSetFormComplete
}


const WelcomeReducer: Reducer<WelcomeReducerState> =
	(state: WelcomeReducerState = initialState, action: WelcomeCreators.Actions): WelcomeReducerState => {
		if (action && action.type && handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		}
		else {
			return state;
		}
	}

export default WelcomeReducer
