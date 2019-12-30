
export interface TopMenuProps extends AuthenticationReducerState {
	onLogout(): void;
}

export interface LayoutViewProps {
	children?: any;
	layout: LayoutReducerState;
	authentication: AuthenticationReducerState;
	onLogout(): void;
	onDismissMessage(): void;
	onDismissModal(): void;
	onRefreshSession(): void;
}

