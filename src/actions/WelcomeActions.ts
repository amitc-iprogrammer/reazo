import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IOktaPasswordComplexity, OktaToken } from 'src/lib/Authentication/types/OktaAuth';
import * as Validation from 'src/lib/Validation';
import StoreState from 'src/reducers/types/StoreState';
import { WelcomeFormField, WelcomeReducerState } from 'src/reducers/types/WelcomeReducerState';
import * as AuthenticationCreators from '../creators/AuthenticationCreators';
import * as WelcomeCreators from '../creators/WelcomeCreators';
import AuthenticationService from '../lib/Authentication/AuthenticationService';
import { handleSessionTimeoutWarning } from './AuthenticationActions';

export const onVerifyUserId = (userId: string): ThunkAction<void, StoreState, void, any> => {
	return (dispatch: Dispatch<any>) => {
		dispatch(WelcomeCreators.VerifyUserIdLoading());
		dispatch(WelcomeCreators.SetUserId(userId));

		AuthenticationService.VerifyUserId(userId)
			.then((accountLogin: string) => {

				AuthenticationService.GetPasswordComplexity()
					.then((passwordComplexity: IOktaPasswordComplexity) => {

						dispatch(WelcomeCreators.VerifyUserIdSuccess(accountLogin, passwordComplexity))

						dispatch(WelcomeCreators.SetPasswordValidators(Validation.BuildComplexityValidators(passwordComplexity)));
					})
					.catch(
						(err: any) => dispatch(WelcomeCreators.VerifyUserIdFailure())
					);

			})
			.catch(
				(err: any) => dispatch(WelcomeCreators.VerifyUserIdFailure()
			));
	}
}

export const onFormChange = (formId: string, e: any, data: any): ThunkAction<void, StoreState, void, any> => {
	return (dispatch: Dispatch<any>, getState: () => StoreState) => {

		let targetField: (string | null | undefined) = e.target.name;
		let fieldValue: (string | null | undefined) = e.target.value;

		if (targetField === null || targetField === undefined || targetField === '') {
			targetField = data.name;

			if (data.type === 'checkbox') {
				fieldValue = data.checked;
			}
			else {
				fieldValue = data.value;
			}
		}

		let welcomeState = getState().Welcome;
		const formState = welcomeState[formId];

		if (formState === null ||
			formState === undefined) {
			throw new TypeError(`No form with id: ${formId}`);
		}

		const fieldState: WelcomeFormField = formState.fields[targetField];

		if (fieldState === null ||
			fieldState === undefined) {
			throw new TypeError(`Unknown form field: ${targetField}`);
		}

		const fieldIsValid = Validation.Validate(fieldValue,
			fieldState.validation.required,
			fieldState.validation.validators);

		dispatch(WelcomeCreators.FormChange(formId, targetField, fieldValue, !fieldIsValid));
		dispatch(WelcomeCreators.SetConfirmPasswordValidatorCompareValue());

		welcomeState = getState().Welcome;

		if (targetField === welcomeState.setPasswordForm.fields.newPassword.id &&
			welcomeState.setPasswordForm.fields.confirmNewPassword.value !== null &&
			welcomeState.setPasswordForm.fields.confirmNewPassword.value !== undefined &&
			welcomeState.setPasswordForm.fields.confirmNewPassword.value !== '') {

			const confirmNewPasswordIsValid = Validation.Validate(
				welcomeState.setPasswordForm.fields.confirmNewPassword.value,
				welcomeState.setPasswordForm.fields.confirmNewPassword.validation.required,
				welcomeState.setPasswordForm.fields.confirmNewPassword.validation.validators
			);

			dispatch(WelcomeCreators.FormChange(
				welcomeState.setPasswordForm.id,
				welcomeState.setPasswordForm.fields.confirmNewPassword.id,
				welcomeState.setPasswordForm.fields.confirmNewPassword.value,
				!confirmNewPasswordIsValid
			));

		}
	}
}

export const onFormSubmit = (formId :string): ThunkAction<void, StoreState, void, any> => {
	return (dispatch: Dispatch<any>, getState: () => StoreState) => {

		const welcomeState = getState().Welcome;

		const handleFormChangeCallback = (targetField: string, fieldValue: string, fieldIsValid: boolean) => {
			dispatch(WelcomeCreators.FormChange(formId, targetField, fieldValue, !fieldIsValid));
		}

		dispatch(WelcomeCreators.ClearFormError(formId));

		const formIsValid: boolean = Validation.ValidateValidationForm(welcomeState[formId].fields, handleFormChangeCallback);

		if(formIsValid) {
			dispatch(WelcomeCreators.SetFormLoading(formId, true));

			if(welcomeState.verifyUserId.userId === null ||
				welcomeState.verifyUserId.userId === undefined) {
					throw new TypeError('No account id loaded.');
				}

				const successCallback = () => {

					dispatch(WelcomeCreators.SetFormLoading(formId, false));
					dispatch(WelcomeCreators.ClearFormError(formId));
					dispatch(WelcomeCreators.SetFormComplete(formId, true));

					
					const newWelcomeState :WelcomeReducerState = getState().Welcome;
					
					const username :string = newWelcomeState.verifyUserId.accountLogin!;
					const password :string = newWelcomeState.setPasswordForm.fields.newPassword.value!;

					const welcomeComplete :boolean = newWelcomeState.verifyUserId.success === true &&
						newWelcomeState.setPasswordForm.complete === true &&
						newWelcomeState.setSecurityQuestion.complete === true;
					
					if(welcomeComplete){
						setTimeout(() => {
							AuthenticationService.Login(username, password, (expiresInSeconds :number) => handleSessionTimeoutWarning(dispatch, getState, expiresInSeconds))
							.then(
								(res: OktaToken) => {
									dispatch(push('/dashboard'));
									dispatch(AuthenticationCreators.LoggedIn(res));
								}
							)
							.catch((err :any) => {
								dispatch(AuthenticationCreators.LoginFailure());
							});
						}, 3000);				
					}
				}

				const errorCallback = (error :{ response : {data : {Message :string }  } }) => {
					dispatch(WelcomeCreators.SetFormLoading(formId, false));
					dispatch(WelcomeCreators.SetFormError(formId, error.response.data.Message));
				}
			
				if(formId === welcomeState.setPasswordForm.id) {
					AuthenticationService.ChangePassword(
						welcomeState.verifyUserId.userId!,
						welcomeState.setPasswordForm.fields.oldPassword.value!,
						welcomeState.setPasswordForm.fields.newPassword.value!)	
						.then ( () => {
							successCallback();
						})
						.catch( (error :{ response : {data : {Message :string }  } } ) => {
							errorCallback(error);
						});	
				}
				else if(formId === welcomeState.setSecurityQuestion.id) {
					AuthenticationService.ChangeSecurityQuestion(
						welcomeState.verifyUserId.userId!,
						welcomeState.setPasswordForm.fields.newPassword.value!,
						welcomeState.setSecurityQuestion.fields.securityQuestion.value!,
						welcomeState.setSecurityQuestion.fields.securityAnswer.value!)	
						.then ( () => {
							successCallback();
						})
						.catch( (error :{ response : {data : {Message :string }  } } ) => {
							errorCallback(error);
						});	
				}
		}
		else {
			dispatch(WelcomeCreators.SetFormError(formId, 'Please make sure all the fields are filled out.'));
		}
	}
}

