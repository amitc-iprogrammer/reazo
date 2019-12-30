import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import DashboardView from './DashboardView';
import { DashboardContainerProps } from './types/DashboardContainer';


export class AppContainer extends React.Component<DashboardContainerProps> {


	public render(): React.SFCElement<any> {
		return React.createElement(DashboardView, null);
	}


}


const mapStateToProps = (state :any) => ({});

/**
 * @function mapDispatchToProps
 * Binds our onCheckAuthentication action to the props of this component.
 * 
 * @param dispatch - Redux dispatcher
 * @param {function} onCheckAuthentication - Action to check the authentication state of the user.
 * 
 * @see /src/actions/AuthenticationActions.js
 */
const mapDispatchToProps = (dispatch :any) => bindActionCreators({ }, dispatch);

/** @exports AppContainer
 * Exports the AppContainer components and decorates it with 
 * React Router props, Okta Auth props, and its Redux props.
 */
export default withRouter(<any>connect(
	mapStateToProps,
	mapDispatchToProps
)(AppContainer));


