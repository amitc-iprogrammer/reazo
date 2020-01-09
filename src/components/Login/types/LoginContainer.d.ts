type LoginContainerProps = ILoginContainerProps;

interface ILoginContainerProps {
	authentication: AuthenticationReducerState;
	push :(url :string) => void;
	onLogin(username: string, password: string): void;
	onAuthenticationFormChange(targetField: string, fieldValue: string, fieldIsValid: boolean): void;
	onForgotPasswordToggle(): void;
	onForgotPassword(username: string): void;
	onTemporaryPasswordSet(username: string, password: string): void;
	emailTemporaryData:string;
	state:void;
}