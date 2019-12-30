import { Action, ActionCreator } from 'redux';

declare namespace ResetPasswordCreators
{
	export type Actions = 	VerifyTokenLoading |
	VerifyTokenSuccess |
	VerifyTokenFailure |
	VerifySecurityQuestionLoading |
	VerifySecurityQuestionSuccess |
	VerifySecurityQuestionFailure |
	ChangePasswordLoading |
	ChangePasswordSuccess |
	ChangePasswordFailure |
	SecurityQuestionFormChange |
	ChangePasswordFormChange;

	interface PasswordComplexity {
		minLength: number;
		minLowerCase: number;
		minUpperCase: number;
		minNumber: number;
		minSymbol : number;
		excludeUsername: boolean;
	}

	interface VerifyTokenLoading extends Action	{}

	interface VerifyTokenSuccess extends Action	{
		securityQuestion: string;
	}

	interface VerifyTokenFailure extends Action	{}

	interface VerifySecurityQuestionLoading extends Action	{}

	interface VerifySecurityQuestionSuccess extends Action	{
		complexity: PasswordComplexity
	}

	interface VerifySecurityQuestionFailure extends Action	{}

	interface ChangePasswordLoading extends Action	{}

	interface ChangePasswordSuccess extends Action	{}

	interface ChangePasswordFailure extends Action	{}

	interface SecurityQuestionFormChange extends Action	{
		field: string;
		value: string;
		isValid: boolean;
	}

	interface ChangePasswordFormChange extends Action{
		field: string;
		value: string;
		isValid: boolean;
	}

	interface VerifyTokenLoadingCreator extends ActionCreator<VerifyTokenLoading> {
		() : VerifyTokenLoading;
	}

	interface VerifyTokenSuccessCreator extends ActionCreator<VerifyTokenSuccess> {
		( securityQuestion:string ) : VerifyTokenSuccess;
	}
	
	interface VerifyTokenFailureCreator extends ActionCreator<VerifyTokenFailure> {
		() : VerifyTokenFailure;
	}

	interface VerifySecurityQuestionLoadingCreator extends ActionCreator<VerifySecurityQuestionLoading> {
		() : VerifySecurityQuestionLoading;
	}

	interface VerifySecurityQuestionSuccessCreator extends ActionCreator<VerifySecurityQuestionSuccess> {
		( passwordComplexity: PasswordComplexity ) : VerifySecurityQuestionSuccess;
	}

	interface VerifySecurityQuestionFailureCreator extends ActionCreator<VerifySecurityQuestionFailure> {
		() : VerifySecurityQuestionFailure;
	}

	interface ChangePasswordLoadingCreator extends ActionCreator<ChangePasswordLoading> {
		() : ChangePasswordLoading;
	}

	interface ChangePasswordSuccessCreator extends ActionCreator<ChangePasswordSuccess> {
		() : ChangePasswordSuccess;
	}

	interface ChangePasswordFailureCreator extends ActionCreator<ChangePasswordFailure> {
		() : ChangePasswordFailure;
	}

	interface SecurityQuestionFormChangeCreator extends ActionCreator<SecurityQuestionFormChange> {
		(field: string, value: string, isValid: boolean ) : SecurityQuestionFormChange;
	}

	interface ChangePasswordFormChangeCreator extends ActionCreator<ChangePasswordFormChange> {
		(field: string, value: string, isValid: boolean ) : ChangePasswordFormChange;
	}

}
