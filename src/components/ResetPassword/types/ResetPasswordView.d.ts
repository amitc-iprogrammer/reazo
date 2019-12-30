export interface ResetPasswordProps {
	resetPassword: ResetPassswordReducerState;
	onFormSubmit(): void;
	onFormChange(event: any, data: any): void;
}

export interface ChangePasswordViewProps {
	resetPassword: ResetPassswordReducerState;
	passwordComplexityMessages: Array<{ message: string}>
	onFormSubmit(): void;
	onFormChange(e: any, data :any): void;
}