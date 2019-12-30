export interface LayoutContainerProps {
	layout: LayoutReducerState;
	authentication: AuthenticationReducerState;
	onLogout(): void;
	onDismissMessage(): void;
	onDismissModal(): void;
	onRefreshSession(): void;
}