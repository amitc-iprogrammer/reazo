import { Action, ActionCreator } from "redux";
import { IOktaPasswordComplexity } from "src/lib/Authentication/types/OktaAuth";

declare namespace WelcomeCreators {

	export type Actions =
		VerifyUserIdLoading |
		VerifyUserIdSuccess |
		VerifyUserIdFailure |
		FormChange |
		SetPasswordValidators |
		SetConfirmPasswordValidatorCompareValue |
		SetFormError |
		ClearFormError |
		SetFormLoading |
		SetUserId | 
		SetFormComplete


	interface SetUserId extends Action {
		userId :string
	}	

	interface VerifyUserIdLoading extends Action { }

	interface VerifyUserIdSuccess extends Action {
		accountLogin: string
		passwordComplexity: IOktaPasswordComplexity
	}

	interface VerifyUserIdFailure extends Action { }

	interface FormChange extends Action {
		formId: string
		fieldId: string
		value: string
		error: boolean
	}

	interface SetPasswordValidators extends Action {
		validators: IValidator[]
	}

	interface SetConfirmPasswordValidatorCompareValue extends Action {

	}

	interface SetFormError extends Action {
		formId :string
		errorMessage: string
	}

	interface ClearFormError extends Action {
		formId :string
	}

	interface SetFormLoading extends Action {
		formId :string
		loading: boolean
	}

	interface SetFormComplete extends Action {
		formId :string
		complete: boolean
	}


	interface VerifyUserIdLoadingCreator extends ActionCreator<VerifyUserIdLoading> {
		(): VerifyUserIdLoading;
	}

	interface VerifyUserIdSuccessCreator extends ActionCreator<VerifyUserIdSuccess> {
		(accountLogin: string, passwordComplexity: IOktaPasswordComplexity): VerifyUserIdSuccess;
	}

	interface VerifyUserIdFailureCreator extends ActionCreator<VerifyUserIdFailure> {
		(): VerifyUserIdFailure;
	}

	interface FormChangeCreator extends ActionCreator<FormChange> {
		(formId: string, fieldId: string, value: string, error: boolean): FormChange;
	}

	interface SetPasswordValidatorsCreator extends ActionCreator<SetPasswordValidators> {
		(validators: IValidator[]): SetPasswordValidators;
	}

	interface SetConfirmPasswordValidatorCompareValueCreator extends ActionCreator<SetConfirmPasswordValidatorCompareValue> {
		(): SetConfirmPasswordValidatorCompareValue;
	}


	interface SetFormErrorCreator extends ActionCreator<SetFormError> {
		(formId :string, errorMessage: string): SetFormError;
	}

	interface ClearFormErrorCreator extends ActionCreator<ClearFormError> {
		(formId :string): ClearFormError;
	}

	interface SetFormLoadingCreator extends ActionCreator<SetFormLoading> {
		(formId :string, loading: boolean): SetFormLoading;
	}

	interface SetFormCompleteCreator extends ActionCreator<SetFormComplete> {
		(formId :string, complete: boolean): SetFormComplete;
	}


	interface SetUserIdCreator extends ActionCreator<SetUserId> {
		(userId :string): SetUserId;
	}
}