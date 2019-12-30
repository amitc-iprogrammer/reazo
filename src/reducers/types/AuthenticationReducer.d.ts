type AuthenticationReducerFormFieldNames = 'username' | 'password';
type AuthenticationReducerFormFields  = { [K in AuthenticationReducerFormFieldNames]:AuthenticationReducerFormField }

interface AuthenticationReducerState {
	form: AuthenticationReducerForm & AuthenticationReducerFormFields;
	authenticating:boolean;
	authenticated: (boolean | null);
	loggingIn: boolean;
	loggingOut: boolean;
	logoutError: boolean;
	loginError: boolean;
	session: (JSON | null);
	sessionExpiresInSeconds: (number | null);
	showSessionExpireWarning: boolean;
	inactivityTimeoutInSeconds: (number | null);
	showInactivityTimeoutWarning: boolean
}

interface AuthenticationReducerForm {
	forgotPasswordLoading: boolean;
	forgotPassword: boolean;
	forgotPasswordSuccess: boolean;
	forgotPasswordError: boolean;
}

interface AuthenticationReducerFormField {
	value: string;
	isValid: boolean;
	touched: boolean;
}