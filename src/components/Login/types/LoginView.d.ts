import { ChangeEvent } from "react";


export interface LoginViewProps {

	authentication: AuthenticationReducerState;
	onFormSubmit(): void;
	onFormChange() :ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>; 
	onForgotPasswordToggle(): void;
	onForgotPassword(username: string): void;
}

export interface ForgotPasswordViewProps {

	authentication: AuthenticationReducerState;
	onFormSubmit(): void;
	onFormChange() :ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
	onForgotPasswordToggle(): void;
	onForgotPassword(username: string): void;
}