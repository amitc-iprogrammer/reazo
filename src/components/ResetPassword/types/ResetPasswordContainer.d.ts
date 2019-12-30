import { RouteComponentProps } from "react-router";

export type ResetPasswordContainerProps = 
	IResetPasswordContainerProps &
	RouteComponentProps<{token: string}>;

interface IResetPasswordContainerProps {
	resetPassword: ResetPassswordReducerState;
	onVerifyToken(token: string): void;
	onSecurityQuestionFormChange(field: string, value: string, isValid: boolean): void; 
	onVerifySecurityQuestion(answer: string): void;
	onChangePasswordFormChange(field: string, value: string, isValid: boolean): void;
	onChangePassword(newPassword: string): void;

}