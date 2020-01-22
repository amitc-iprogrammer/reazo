import { ChangeEvent } from "react";


export interface LoginViewProps {
	handlePasswordVisibility(): void
	authentication: AuthenticationReducerState;
	onFormSubmit(): void;
	onStateChange: any;
	handleCloseError: any;
	onFormChange(): ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
	onForgotPasswordToggle(): void;
	onForgotPassword(username: string): void;
	showWelcomeContent:any
}

export interface ForgotPasswordViewProps {

	authentication: AuthenticationReducerState;
	onFormSubmit(): void;
	onStateChange: any;
	onFormChange(): ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
	onForgotPasswordToggle(): void;
	onForgotPassword(username: string): void;
}