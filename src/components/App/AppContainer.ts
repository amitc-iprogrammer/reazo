import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'

import { withAuth } from '@okta/okta-react';

import { onCheckAuthentication, onSetInactivtyTimeout } from '../../actions/AuthenticationActions'
import AppView from './AppView'
import { AppContainerProps } from './types/AppContainer';
import { AppViewProps } from './types/AppView';


/**
 * @class {Component} AppContainer
 * Provides a container for the application and provides authentication
 * checking for the application.
 * 
 * Renders markup from the AppView.js file.
 * 
 * @exports AppContainer - Exports the unwrapped component for testing purposes.
 * 
 * @listens componentWillMount
 * @listens render
 * 
 * @see /src/components/App/AppView.js 
 * 
 */
export class AppContainer extends React.Component<AppContainerProps> {

	private events: string[] = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

	/**
	 * @function componentWillMount
	 * 
	 * This method will check the authentication status of the user.
	 * 
	 * @listens componentWillMount
	 */
	public componentWillMount() {
		this.props.onCheckAuthentication();
	}

	public componentDidMount() {
		for (const i in this.events) {
			if (this.events.hasOwnProperty(i)) {
				window.addEventListener(this.events[i], this.handleResetInactivtyTimeout);
			}
		}
	}

	/**
	 * @function render
	 * 
	 * This method renders the AppView markup
	 * 
	 * @listens render
	 * @see /src/components/App/AppView.js
	 */
	public render(): React.SFCElement<AppViewProps> {
		return React.createElement(AppView, null);
	}

	private handleResetInactivtyTimeout = () => { this.props.onSetInactivtyTimeout() };
}

/** 
 * @member {object} AppContainer.propTypes
 * 
 * @property {PropType} onCheckAuthentication
 * 	This prop is passed in as a Redux action. It called when the component 
 *  mounts and sets state to indicate if the user is authenticated or not.
 */
// tslint:disable-next-line
AppContainer['propTypes'] = {
	onCheckAuthentication: PropTypes.func,
	onSetInactivtyTimeout: PropTypes.func
}

/**
 * @function mapStateToProps
 * This component doesn't currently need any Redux state.
 * This is here in case we need to add some state to this component.
 * 
 * @param state - The Redux state
 */
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
const mapDispatchToProps = (dispatch :any) => bindActionCreators({ onCheckAuthentication, onSetInactivtyTimeout }, dispatch);

/** @exports AppContainer
 * Exports the AppContainer components and decorates it with 
 * React Router props, Okta Auth props, and its Redux props.
 */
export default withRouter(<any>connect(
	mapStateToProps,
	mapDispatchToProps
)(withAuth(AppContainer)));


