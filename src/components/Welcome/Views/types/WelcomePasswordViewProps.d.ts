import { WelcomeSetPasswordFormState } from "src/reducers/types/WelcomeReducerState";

export interface WelcomePasswordViewProps {
	handleCloseError: any;
	showWelcomeContent: any
	onStateChange: any;
	// onVerifyUserId(arg0: string): void;
	// messageHeader: ReactNode;
	form: WelcomeSetPasswordFormState
	// SecurityQuestionform: WelcomeSetSecurityQuestionFormState
	passwordComplexityMessages: string[]
	onFormChange(formId: string, e: any, data: any): void
	onFormSubmit: any
	handleTemporaryPasswordSubmit: void
	showResetPasswordView: any
	emailClassAdd: any,
	newPasswordClassAdd: any,
	confirmNewPasswordClassAdd: any,
	newPassWordEmptyFieldError: any,
	setNewPasswordEmptyError:any,
	confirmPasswordEmptyFieldError: any,
	passwordClassAdd: any,
	emailValidationErrorMessage: any
	handlePasswordVisibility: any
}

export interface VerifyUserIdLoadingViewProps {
	// messageHeader: ReactNode;
	form: WelcomeSetPasswordFormState
	passwordComplexityMessages: string[]
	onVerifyUserId(userId: string): void
	onFormChange(formId: string, e: any, data: any): void
	onFormSubmit(formId: string): void
}