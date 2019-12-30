interface LayoutReducerState {
	message: LayoutMessage;
	dimmer: LayoutDimmer;
}

interface LayoutMessage {
	visible: boolean; 
	icon: string;
	header: string; 
	text: string;
	positive: boolean | null;
	dismissable: boolean;
}

interface LayoutDimmer {
	visible: boolean;
	icon: string;
	header: string;
	text: string;
	loading: boolean;
}