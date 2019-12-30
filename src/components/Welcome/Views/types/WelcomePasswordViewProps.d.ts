import { WelcomeSetPasswordFormState } from "src/reducers/types/WelcomeReducerState";

export interface WelcomePasswordViewProps {
	form : WelcomeSetPasswordFormState
	passwordComplexityMessages :string[]
	onFormChange(formId :string, e: any, data: any) :void
	onFormSubmit(formId :string) :void
}