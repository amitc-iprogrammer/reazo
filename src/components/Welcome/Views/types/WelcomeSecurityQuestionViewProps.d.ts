import { WelcomeSetPasswordFormState, WelcomeSetSecurityQuestionFormState } from "src/reducers/types/WelcomeReducerState";

export interface WelcomeSecurityQuestionViewProps {
	form : WelcomeSetSecurityQuestionFormState
	onFormChange(formId :string, e: any, data: any) :void
	onFormSubmit(formId :string) :void
}