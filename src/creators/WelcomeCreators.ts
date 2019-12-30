import { IOktaPasswordComplexity } from 'src/lib/Authentication/types/OktaAuth';
import { WelcomeCreators } from './types/WelcomeCreators';

export const WelcomeActionTypes =
{
	SetUserId: 'WELCOME_ACTIONS_SET_ACCOUNT_ID',
	VerifyUserIdLoading: 'WELCOME_ACTIONS_VERIFY_TOKEN_LOADING',
	VerifyUserIdSuccess: 'WELCOME_ACTIONS_VERIFY_TOKEN_SUCCESS',
	VerifyUserIdFailure: 'WELCOME_ACTIONS_VERIFY_TOKEN_FAILURE',
	FormChange: 'WELCOME_ACTIONS_FORM_CHANGE',
	SetPasswordValidators: 'WELCOME_ACTIONS_SET_PASSWORD_VALIDATORS',
	SetConfirmPasswordValidatorCompareValue: 'WELCOME_ACTIONS_SET_CONFIRM_PASSWORD_VALIDATOR_COMPARE_VALUE',
	SetFormError: 'WELCOME_ACTIONS_SET_FORM_ERROR',
	ClearFormError: 'WELCOME_ACTIONS_CLEAR_FORM_ERROR',
	SetFormLoading: 'WELCOME_ACTIONS_SET_FORM_LOADING',
	SetFormComplete: 'WELCOME_ACTIONS_SET_FORM_COMPLETE'
}

export const VerifyUserIdLoading: WelcomeCreators.VerifyUserIdLoadingCreator =
	(): WelcomeCreators.VerifyUserIdLoading => (
		{ type: WelcomeActionTypes.VerifyUserIdLoading }
	);

export const VerifyUserIdSuccess: WelcomeCreators.VerifyUserIdSuccessCreator =
	(accountLogin: string, passwordComplexity: IOktaPasswordComplexity): WelcomeCreators.VerifyUserIdSuccess => {
		return {
			type: WelcomeActionTypes.VerifyUserIdSuccess,
			accountLogin,
			passwordComplexity
		};
	}

export const VerifyUserIdFailure: WelcomeCreators.VerifyUserIdFailureCreator =
	(): WelcomeCreators.VerifyUserIdFailure => {
		return { type: WelcomeActionTypes.VerifyUserIdFailure };
	}

export const FormChange: WelcomeCreators.FormChangeCreator =
	(formId: string, fieldId: string, value: string, error: boolean): WelcomeCreators.FormChange => (
		{
			type: WelcomeActionTypes.FormChange,
			formId,
			fieldId,
			value,
			error
		}
	)

export const SetPasswordValidators: WelcomeCreators.SetPasswordValidatorsCreator =
	(validators: IValidator[]): WelcomeCreators.SetPasswordValidators => (
		{
			type: WelcomeActionTypes.SetPasswordValidators,
			validators
		}
	)

export const SetConfirmPasswordValidatorCompareValue: WelcomeCreators.SetConfirmPasswordValidatorCompareValueCreator =
	(): WelcomeCreators.SetConfirmPasswordValidatorCompareValue => (
		{
			type: WelcomeActionTypes.SetConfirmPasswordValidatorCompareValue
		}
	)

export const SetFormError: WelcomeCreators.SetFormErrorCreator =
	(formId :string, errorMessage: string): WelcomeCreators.SetFormError => (
		{
			type: WelcomeActionTypes.SetFormError,
			formId,
			errorMessage
		}
	)

export const ClearFormError: WelcomeCreators.ClearFormErrorCreator =
	(formId :string): WelcomeCreators.ClearFormError => (
		{
			type: WelcomeActionTypes.ClearFormError,
			formId
		}
	)
export const SetFormLoading: WelcomeCreators.SetFormLoadingCreator =
	(formId :string, loading: boolean): WelcomeCreators.SetFormLoading => (
		{
			type: WelcomeActionTypes.SetFormLoading,
			formId,
			loading
		}
	)

export const SetFormComplete: WelcomeCreators.SetFormCompleteCreator =
	(formId :string, complete: boolean): WelcomeCreators.SetFormComplete => (
		{
			type: WelcomeActionTypes.SetFormComplete,
			formId,
			complete
		}
	)

export const SetUserId: WelcomeCreators.SetUserIdCreator =
	(userId: string): WelcomeCreators.SetUserId => (
		{
			type: WelcomeActionTypes.SetUserId,
			userId
		}
	)



