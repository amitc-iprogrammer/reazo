import { RouterState } from "connected-react-router";
import { WelcomeReducerState } from "src/reducers/types/WelcomeReducerState";

export interface WelcomeContainerProps {

	Welcome :WelcomeReducerState
	match: { params: { userId :string } } 
	onVerifyUserId(userId :string) :void
	onFormChange(formId :string, e: any, data: any) :void
	onFormSubmit(formId :string) :void
	handleTemporaryPasswordSubmit: any
	showWelcomeContent:any
	handleCloseError:any
}