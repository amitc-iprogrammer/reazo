import * as  PropTypes from 'prop-types';
import * as React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'

import { withAuth } from '@okta/okta-react';

import { onLogout, onRefreshSession } from '../../actions/AuthenticationActions'

import { onDismissMessage, onDismissModal } from '../../actions/LayoutActions'

import LayoutView from './LayoutView'
import { LayoutContainerProps } from './types/LayoutContainer';

export const LayoutMessages = {
	ValidationErrors: 'validationErrors'
}

/**
 * @class {Component} LayoutContainer
 * Provides a standard layout for the application to render within. Also
 * provides layout elements such a menus, modals, dimmers, and loaders that 
 * can be set from child components using redux actions.
 * 
 * Renders markup from the LayoutView.js file.
 * 
 * @exports LayoutContainer - Exports the unwrapped component for testing purposes.
 * 
 * @listens render
 * 
 * @see /src/components/Layout/LayoutView.js 
 * 	This component renders markup from LayoutView.js 
 * @see /src/reducers/LayoutReducer.js
 * 	This component uses the state from the LayoutReducer.
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 */
export class LayoutContainer extends React.Component<LayoutContainerProps>
{
	/**
	 * @function render
	 * 
	 * This method renders the LayoutView markup
	 * 
	 * @listens render
	 * @see /src/components/App/AppView.js
	 */
	public render() {
		const message = { ...this.props.layout.message };

		return React.createElement(LayoutView, <any>{
			...this.props,
			onLogout: this.props.onLogout,
			layout: { ...this.props.layout, message: message }
		});
	}
}

/** 
 * @member {object} LayoutContainer.propTypes
 * 
 * @property {PropType} onRefreshSession
 * @property {PropType} onLogout
 * 	This prop is passed in as a Redux action. It called when user requests to 
 * 	be logged out of their session.
 * @property {PropType} onDismissMessage
 * 	Called when the user dismisses the Layout message.
 * @property {PropType} authentication
 * 	This component uses the state from the AuthenticationReducer.  
 * @property {PropType} layout
 * 	This component uses the state from the LayoutReducer. 
 * @property {PropType} children
 * 	Renders an child components.
 * 
 * @see /src/reducers/LayoutReducer.js
 * 	This component uses the state from the LayoutReducer.
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 * @see /src/actions/LayoutActions.js
 * 	This component uses actions from LayoutActions.
 */
// tslint:disable-next-line
LayoutContainer['propTypes'] = {
		onRefreshSession: PropTypes.func.isRequired,
		onLogout: PropTypes.func.isRequired,
		onDismissMessage: PropTypes.func.isRequired,
		authentication: PropTypes.object.isRequired,
		layout: PropTypes.shape({
			dimmer: PropTypes.shape({
				header: PropTypes.string,
				icon: PropTypes.string,
				loading: PropTypes.bool,
				text: PropTypes.string,
				visible: PropTypes.bool
			}
			),
			message: PropTypes.shape({
				header: PropTypes.string,
				icon: PropTypes.string,
				positive: PropTypes.bool,
				text: PropTypes.string,
				visible: PropTypes.bool,
				dismissable: PropTypes.bool
			}
			)
		}
		),
		children: PropTypes.any
	}

/** 
 * @member {object} LayoutContainer.defaultProps
 * Default props for testing purposes.
 */
// tslint:disable-next-line
LayoutContainer['defaultProps'] = {
	onRefreshSession: () => ( undefined ),
	onLogout: () => ( undefined ),
	authentication: {
		authenticating: false,
		loggingOut: false,
		authenticated: false,
		session: {
			claims: {
				name: ''
			}
		}
	},
	layout: {
		dimmer: {
			header: '',
			icon: '',
			loading: false,
			text: '',
			visible: false
		},
		message: {
			header: '',
			icon: '',
			positive: false,
			text: '',
			visible: false,
			dismissable: false
		}
	},
	children: () => ( React.createElement(React.Fragment) )
};

/**
 * @function mapStateToProps
 * 
 * Maps Redux state to the props of this component. 
 * 
 * @see /src/reducers/LayoutReducer.js
 * 	This component uses the state from the LayoutReducer.
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 * 
 * @param state - The Redux state
 */
const mapStateToProps = (state :any) => ({ authentication: state.Authentication, layout: state.Layout });

/**
 * @function mapDispatchToProps
 * Binds our Redux actions to the props of this component.
 * 
 * @param dispatch - Redux dispatcher
 * @param {function} onLogout - Action to log the user out of their current session
 * @property {PropType} onDismissMessage - Called when the user dismisses the Layout message.
 * @see /src/creators/AuthenticationCreators.js
 */
const mapDispatchToProps = (dispatch :any) => bindActionCreators({ onLogout, onDismissMessage, onDismissModal, onRefreshSession }, dispatch);

/** @exports LayoutContainer
 * Exports the LayoutContainer components and decorates it with 
 * React Router props, Okta Auth props, and its Redux props.
 */
export default withRouter(<any>connect(
	mapStateToProps,
	mapDispatchToProps
)(withAuth(LayoutContainer)));

