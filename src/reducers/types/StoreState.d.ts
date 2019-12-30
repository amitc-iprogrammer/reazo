import { RouterState } from "connected-react-router";
import { WelcomeReducerState } from "./WelcomeReducerState";

export default interface StoreState {
	router: RouterState
	Authentication :AuthenticationReducerState
	Layout: LayoutReducerState
	ResetPassword :ResetPassswordReducerState
	Welcome :WelcomeReducerState
} 