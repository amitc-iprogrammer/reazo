import { Action, ActionCreator } from 'redux';

declare namespace LayoutCreators
{
	export type Actions = 	ShowDimmer | HideDimmer | ShowMessage | HideMessage;

	interface ShowDimmer extends Action	{
		icon: string;
		header: string;
		text: string;
		loading: boolean;
	}

	interface HideDimmer extends Action	{}

	interface ShowMessage extends Action {
		icon: string;
		header: string;
		text: string;
		dismissable: boolean;
		positive: boolean;
	}

	interface HideMessage extends Action {}


	interface ShowDimmerCreator extends ActionCreator<ShowDimmer> {
		( icon: string, header: string, text: string, loading: boolean ): ShowDimmer;
	}

	interface HideDimmerCreator extends ActionCreator<HideDimmer> {
		() : HideDimmer;
	}

	interface ShowMessageCreator extends ActionCreator<ShowMessage> {
		( icon: string, header: string, text: string, positive: boolean, dismissable: boolean ): ShowMessage;
	}

	interface HideMessageCreator extends ActionCreator<HideMessage> {
		() : HideMessage;
	}

}
