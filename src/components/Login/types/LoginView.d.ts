import { ChangeEvent } from "react";


export interface LoginViewProps {

	authentication: AuthenticationReducerState;
	onStateChange: any;
	onFormSubmit(): void;
	handleCloseError: any
	onFormChange() :ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>; 
	onForgotPasswordToggle(): void;
	onForgotPassword(username: string): void;
}

export interface TemporaryPasswordViewProps {
	handleCloseError: any
	onStateChange: any;
	authentication: AuthenticationReducerState;
	onFormSubmit(): void;
	onFormChange() :ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>; 
}

export interface ForgotPasswordViewProps {

	authentication: AuthenticationReducerState;
	onFormSubmit(): void;
	onFormChange() :ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
	onForgotPasswordToggle(): void;
	onForgotPassword(username: string): void;
}