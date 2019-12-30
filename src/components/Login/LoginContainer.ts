import { withAuth } from '@okta/okta-react';
import { push } from 'connected-react-router';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onAuthenticationFormChange, onForgotPassword, onForgotPasswordToggle, onLogin } from '../../actions/AuthenticationActions';
import { Validate, ValidateForm } from '../../lib/Validation';
import LoginLayout from './LoginLayout';
import { LoginView } from './LoginView';


export class LoginContainer extends React.Component<LoginContainerProps> {

	/**
	 * @member {object} loginFormValidators
	 * 	Validators for the login form.
	 */
	private loginFormValidators = {
		password: { required: true },
		username: { required: true }

	}

	/**
	 * @member {object} forgotPasswordFormValidators
	 * 	Validators for the forgot password form.
	 */
	private forgotPasswordFormValidators = {
		username: { required: true }
	}



	/**
	 * @function render
	 * The function renders markup from the LoginView.js file based on the 
	 * state of the compoment. 
	 * 
	 * @returns {JSX} - The rendered markup based on the state of the control.
	 */
	public render() {
		let viewComponent: React.ReactElement<any> | null = null;

		if (this.props.authentication.authenticated === true) {
			this.props.push('/dashboard');
		}
		else if (this.props.authentication.form.forgotPasswordSuccess === true) {
			// viewComponent = React.createElement();
		}
		// else if (this.props.authentication.form.forgotPassword === true) {
		// 	// viewComponent = React.createElement(ForgotPasswordView,
		// 		{
		// 			...this.props,
		// 			onForgotPasswordToggle: this.props.onForgotPasswordToggle,
		// 			onFormChange: this.handleFormChange,
		// 			onFormSubmit: this.handleFormSubmit
		// 		} as any
		// 	);
		// }
		else {
			viewComponent = React.createElement(LoginView,
				{
					...this.props,
					onForgotPasswordToggle: this.props.onForgotPasswordToggle,
					onFormChange: this.handleFormChange,
					onFormSubmit: this.handleFormSubmit,
				} as any
			);
		}

		return React.createElement(LoginLayout, null, viewComponent);
	}

	/**
	 * @function formValidators
	 * The function returns a set of validators bases on the current state
	 * of the component.
	 * 
	 * @returns {object} 
	 * 	The validators that should be used with the current form.
	 */
	private formValidators = () => {
		return this.props.authentication.form.forgotPassword === true ?
			this.forgotPasswordFormValidators :
			this.loginFormValidators;
	}

	/**
	 * @function handleFormSubmit
	 * The function handles the form submit request from the view
	 * components. It will validate the current form, if the form is 
	 * valid it will call an authentication action.
	 */
	private handleFormSubmit = () => {
		const formIsValid = ValidateForm(this.props.authentication.form,
			this.formValidators() as any,
			this.props.onAuthenticationFormChange
		);

		if (formIsValid) {
			if (this.props.authentication.form.forgotPassword === true) {
				this.props.onForgotPassword(this.props.authentication.form.username.value);
			}
			else {
				this.props.onLogin(this.props.authentication.form.username.value, this.props.authentication.form.password.value);
			}
		}
	}

	/**
	 * @function handleFormChange
	 * The function handles the change events from the login and forgot 
	 * password form. It will validate the changed field and call a prop
	 * action to set the state of the change field.
	 * 
	 * @param {object} e - The event that caused the change.
	 * @param {object} data - The data from the change.
	 */
	private handleFormChange = (e :any, data :any) => {
		const targetField = e.target.name;
		const fieldValue = e.target.value;

		let fieldIsValid = true;

		const validators = this.formValidators();

		if (validators.hasOwnProperty(targetField)) {
			fieldIsValid = Validate(fieldValue,
				validators[e.target.name].required,
				validators[e.target.name].validators);
		}

		this.props.onAuthenticationFormChange(targetField, fieldValue, fieldIsValid);
	}
}

/** 
 * @member {object} LoginContainer.propTypes
 *  
 * @property {PropType} authentication
 * 	This component uses the state from the AuthenticationReducer. 
 * @property {function} onLogin 					
 * 	Action to attemp to log the user in.
 * @property {function} onAuthenticationFormChange
 * 	Action to handle changes to the login or forgot password forms.
 * @property {function} onForgotPasswordToggle
 * 	Action to handle toggling between the login and forgot password forms.
 * @property {function} onForgotPassword
 * 	Action to handle the user requesting a forgot password verification notice. 
 *
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 * @see /src/creators/AuthenticationCreators.js
 *  This component uses the actions from the AuthenticationCreators.
 */
// tslint:disable-next-line
LoginContainer['propTypes'] = {
	authentication: PropTypes.shape({
		authenticated: PropTypes.bool,
		authenticating: PropTypes.bool,
		form: PropTypes.shape({
			forgotPassword: PropTypes.bool,
			forgotPasswordError: PropTypes.bool,
			forgotPasswordLoading: PropTypes.bool,
			forgotPasswordSuccess: PropTypes.bool,
			password: PropTypes.shape({
				isValid: PropTypes.bool,
				touched: PropTypes.bool,
				value: PropTypes.string
			}),
			username: PropTypes.shape({
				isValid: PropTypes.bool,
				touched: PropTypes.bool,
				value: PropTypes.string
			})
		}),
		loggingIn: PropTypes.bool,
		loggingOut: PropTypes.bool,
		loginError: PropTypes.bool,
		logoutError: PropTypes.bool,
		session: PropTypes.bool
	}),
	onAuthenticationFormChange: PropTypes.func,
	onForgotPassword: PropTypes.func,
	onForgotPasswordToggle: PropTypes.func,
	onLogin: PropTypes.func
}

/** 
 * @member {object} LoginContainer.defaultProps
 * Default props for testing purposes.
 */
// tslint:disable-next-line
LoginContainer['defaultProps'] = {
	authentication: {
		authenticated: null,
		authenticating: false,
		form: {
			forgotPassword: false,
			forgotPasswordError: false,
			forgotPasswordLoading: false,
			forgotPasswordSuccess: false,
			password: { value: '', isValid: true, touched: false },
			username: { value: '', isValid: true, touched: false }
		},
		loggingIn: false,
		loggingOut: false,
		loginError: false,
		logoutError: false,
		session: null
	},
	onAuthenticationFormChange: () => ( undefined ),
	onForgotPassword: () => ( undefined ),
	onForgotPasswordToggle: () => ( undefined ),
	onLogin: () => ( undefined )
}

/**
 * @function mapStateToProps
 * 
 * Maps Redux state to the props of this component. 
 * 
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 * 
 * @param state - The Redux state
 */
const mapStateToProps = (state :any) => ({ authentication: state.Authentication })

/**
 * @function mapDispatchToProps
 * Binds our Redux actions to the props of this component.
 * 
 * @param dispatch - Redux dispatcher
 * @param {function} onLogin 					
 * 	Action to attemp to log the user in.
 * @param {function} onAuthenticationFormChange
 * 	Action to handle changes to the login or forgot password forms.
 * @param {function} onForgotPasswordToggle
 * 	Action to handle toggling between the login and forgot password forms.
 * @param {function} onForgotPassword
 * 	Action to handle the user requesting a forgot password verification notice. 
 * 
 * @see /src/creators/AuthenticationCreators.js
 */
const mapDispatchToProps = (dispatch :any) => bindActionCreators({ onLogin, onAuthenticationFormChange, onForgotPasswordToggle, onForgotPassword, push }, dispatch);

/** @exports LoginContainer
 * Exports the LoginContainer components and decorates it with 
 * Okta Auth props and its Redux props.
 */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withAuth(LoginContainer));
