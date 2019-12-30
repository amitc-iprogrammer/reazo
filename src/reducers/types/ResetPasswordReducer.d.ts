interface ResetPassswordReducerState {
    changePasswordForm: ResetPassswordChangePasswordForm;
	securityQuestionForm: ResetPassswordsecurityQuestionForm;
	verifyToken: ResetPassswordVerifyTokenState;
	securityQuestion: ResetPassswordSecurityQuestionState;
	changePassword: ResetPassswordChangePasswordState
}

type ResetPassswordSecurityQuestionFormFields = 'answer';
type ResetPassswordsecurityQuestionForm  = { [K in ResetPassswordSecurityQuestionFormFields]: ResetPasswordFormField }

type ResetPassswordChangePasswordFormFields = 'newPassword' | 'confirmPassword';
type ResetPassswordChangePasswordForm  = { [K in ResetPassswordChangePasswordFormFields]: ResetPasswordFormField }


interface ResetPasswordFormField {
	value: string;
	isValid: boolean;
	touched: boolean;
}

interface ResetPassswordVerifyTokenState {
	loading: boolean,
	success: boolean,
	error: boolean
}

interface ResetPassswordSecurityQuestionState {
	question: string,
	loading: boolean,
	success: boolean,
	error: boolean
}

interface ResetPassswordChangePasswordState {
	loading: boolean,
	success: boolean,
	error: boolean,
	complexity: ResetPasswordPasswordComplexityState;
}

interface ResetPasswordPasswordComplexityState {
	excludeUsername: boolean;
	minLength: number;
	minLowerCase: number;
	minNumber: number;
	minSymbol: number;
	minUpperCase: number;
}
