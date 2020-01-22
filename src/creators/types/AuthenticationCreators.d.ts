import { Action, ActionCreator } from 'redux';

declare namespace AuthenticationCreators
{

	export type Actions = 
	LoggedOut |		
	LoggingOut |
	LogoutFailure |
	LoggingIn |
	LoggedIn |
	LoginFailure |
	Authenticating |
	AuthenticatingSuccess |
	AuthenticatingFailure |
	ForgotPasswordSuccess |
	ForgotPasswordFailure |
	ForgotPasswordLoading |
	FormChange |
	ForgotPasswordToggle | 
	SetSessionTimeoutWarning  | 
	ClearSessionTimeoutWarning  | 
	SetInactivityTimeoutWarning  | 
	ClearInactivityTimeoutWarning;


	interface LoggedOut extends Action {}

	interface LoggingOut extends Action {}

	interface LogoutFailure extends Action {}

	interface LoggingIn extends Action {}

	interface LoggedIn extends Action {
		session: JSON;
	}

	interface LoginFailure extends Action {}

	interface Authenticating extends Action {}

	interface AuthenticatingSuccess extends Action {
		session: JSON;
	}

	interface AuthenticatingFailure extends Action {}

	interface ForgotPasswordSuccess extends Action {}

	interface ForgotPasswordFailure extends Action {}

	interface ForgotPasswordLoading extends Action {}

	interface FormChange extends Action {
		field: string;
		value: string;
		isValid: boolean;
	}

	interface ForgotPasswordToggle extends Action {}

	interface SetSessionTimeoutWarning extends Action {
		sessionExpiresInSeconds: number
	}
	
	interface ClearSessionTimeoutWarning extends Action {}

	interface SetInactivityTimeoutWarning extends Action {
		inactivityTimeoutInSeconds: number;
	}

	interface ClearInactivityTimeoutWarning extends Action {

	}

	interface LoggedOutCreator extends ActionCreator<LoggedOut> {}
	interface LoggingOutCreator extends ActionCreator<LoggingOut> {}
	interface LogoutFailureCreator extends ActionCreator<LogoutFailure> {}
	interface LoggingInCreator extends ActionCreator<LoggingIn> {}
	interface LoggedInCreator extends ActionCreator<LoggedIn> {
		( session: JSON ): LoggedIn;
	}
	interface LoginFailureCreator extends ActionCreator<LoginFailure> {}
	interface AuthenticatingCreator extends ActionCreator<Authenticating> {}
	interface AuthenticatingSuccessCreator extends ActionCreator<AuthenticatingSuccess> {
		( session: JSON ): AuthenticatingSuccess;
	}
	interface AuthenticatingFailureCreator extends ActionCreator<AuthenticatingFailure> {}
	interface ForgotPasswordSuccessCreator extends ActionCreator<ForgotPasswordSuccess> {}
	interface ForgotPasswordFailureCreator extends ActionCreator<ForgotPasswordFailure> {}
	interface ForgotPasswordLoadingCreator extends ActionCreator<ForgotPasswordLoading> {}
	interface FormChangeCreator extends ActionCreator<FormChange> {}
	interface ForgotPasswordToggleCreator extends ActionCreator<ForgotPasswordToggle> {}
	interface SetSessionTimeoutWarningCreator extends ActionCreator<SetSessionTimeoutWarning> {
		( sessionExpiresInSeconds: number ): SetSessionTimeoutWarning;
	}
	interface ClearSessionTimeoutWarningCreator extends ActionCreator<ClearSessionTimeoutWarning> {}
	interface SetInactivityTimeoutWarningCreator extends ActionCreator<SetInactivityTimeoutWarning> {
		( inactivityTimeoutInSeconds: number ): SetInactivityTimeoutWarning;
	}
	interface ClearInactivityTimeoutWarningCreator extends ActionCreator<ClearInactivityTimeoutWarning> {}

}
