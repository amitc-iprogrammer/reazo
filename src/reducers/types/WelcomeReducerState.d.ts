import { IOktaPasswordComplexity } from "src/lib/Authentication/types/OktaAuth";

export interface WelcomeReducerState {
	verifyUserId:
	{
		loading: boolean
		error: boolean
		success: boolean
		showResetPasswordView: boolean
		emailClassAdd: boolean
		newPasswordClassAdd:boolean,
		confirmNewPasswordClassAdd:boolean,
		newPassWordEmptyFieldError: boolean,
		setNewPasswordEmptyError:boolean,
		confirmPasswordEmptyFieldError: boolean,
		passwordClassAdd: boolean
		accountLogin: string | null
		userId: string | null
		passwordComplexity: IOktaPasswordComplexity

	}
	setPasswordForm: WelcomeSetPasswordFormState
	// setSecurityQuestion: WelcomeSetPasswordFormState

}

export interface WelcomeFormField {
	id: string
	value: string | null;
	error: boolean;
	touched: boolean;
	options?: Array<{ value: string, text: string }>
	validation: {
		required: boolean
		validators?: IValidator | IValidator[] | null
	}
}

// export type WelcomeSetSecurityQuestionFormFields =
// 	'securityQuestion' |
// 	'securityAnswer'

// export type WelcomeSetSecurityQuestionFieldsState = { [K in WelcomeSetSecurityQuestionFormFields]: WelcomeFormField }

// export interface WelcomeSetSecurityQuestionFormState {
// 	id: string
// 	fields: WelcomeSetSecurityQuestionFieldsState
// 	error: boolean
// 	errorMessage: string
// 	loading: boolean
// 	complete: boolean
// }


export type WelcomeSetPasswordFormFields =
	'securityQuestion' |
	'securityAnswer' |
	'email' |
	'oldPassword' |
	'newPassword' |
	'confirmNewPassword'


export type WelcomeSetPasswordFormFieldsState = { [K in WelcomeSetPasswordFormFields]: WelcomeFormField }

export interface WelcomeSetPasswordFormState {
	id: string
	fields: WelcomeSetPasswordFormFieldsState
	error: boolean
	errorMessage: string
	emailValidationErrorMessage: string
	loading: boolean
	complete: boolean
}
