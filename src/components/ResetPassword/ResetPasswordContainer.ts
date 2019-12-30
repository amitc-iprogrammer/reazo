import * as PropTypes from 'prop-types';
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ResetPasswordLayout from './ResetPasswordLayout'

import {
	ChangePasswordSuccessView,
	ChangePasswordView,
	SecurityQuestionView,
	VerifyTokenFailureView,
	VerifyTokenLoadingView
} from './ResetPasswordView'

import {
	onChangePassword,
	onChangePasswordFormChange,
	onSecurityQuestionFormChange,
	onVerifySecurityQuestion,
	onVerifyToken
} from '../../actions/ResetPasswordActions'

import {
	BuildComplexityValidators,
	CompareDataTypes,
	CompareOperators,
	Validate,
	ValidateForm,
	ValidationTypes
} from '../../lib/Validation'

import { ResetPasswordContainerProps } from './types/ResetPasswordContainer';

/**
 * @class ResetPasswordContainer
 * Provides logic, form handling, and rendering for the reset password process. 
 * First, the component validates the reset password token passed in the url, if
 * that token is valid, the user is given their security question challenge, if
 * the anwser that question correctly, then they are prompted to change their password.
 * 
 * @exports ResetPasswordContainer - Exports the unwrapped component for testing purposes.
 * 
 * @listens componentWillMount
 * @listens render 
 * 
 * @see /src/components/ResetPassword/ResetPasswordView.js 
 * 	This component renders markup from ResetPasswordView.js 
 * @see /src/reducers/ResetPasswordReducer.js
 *  This component uses the state from the ResetPasswordReducer.
 * @see /src/creators/ResetPasswordActions.js
 *  This component uses the actions from ResetPasswordActions.
 * @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md
 * 	This component uses 'match' props from React Router
 */
export class ResetPasswordContainer extends React.Component<ResetPasswordContainerProps>
{
	/**
	 * @member complexityValidationMessages
	 * Defines react-intl messages for complexity validation. 
	 */
	private complexityValidationMessages = {
		excludeUsername: () => ( 'Not contain your username' ),
		minimumLength: (minLength :number) => ( `Be at least ${minLength} characters in length` ),
		containsLowerCase: (minLowerCase :number) => ( `Contain at least ${minLowerCase} lower case characters (a-z)` ),
		containsUpperCase: (minUpperCase :number) => ( `Contain at least ${minUpperCase} uppercase characters (A-Z)` ),
		containsInteger: (minNumber :number) => ( `Contain at least ${minNumber} digit (0-9)` ),
		containsNonAlphaNumeric: (minSymbol :number) => ( `Contain at least ${minSymbol} special characters (punctuation).`)
	};

	/**
	 * @member {object} securityQuestionValidators
	 * 	Validators for the Security Question form.
	 */
	private securityQuestionValidators = { answer: { required: true } };

	/**
	 * @member {object} changePasswordValidators
	 * 	Validators for the Change Password form.
	 */
	private changePasswordValidators = {
		newPassword: { required: true },
		confirmPassword: { required: true }
	};

	/**
	 * @function componentWillMount
	 * When this component mounts, it will check the url for the password
	 * reset verification token and fire the onVerifyToken action.
	 */
	public componentWillMount() {
		let token: (string | null) = null;

		if (this.props.match && this.props.match.params && this.props.match.params.token) {
			token = this.props.match.params.token;
			this.props.onVerifyToken(token);
		}
	}

	/**
	 * @function render
	 * The function renders markup from the ResetPasswordView.js file based on the 
	 * state of the compoment. 
	 * 
	 * @returns {JSX} - The rendered markup based on the state of the control.
	 */
	public render() {

		let resetPasswordView: (React.SFCElement<any> | null) = null;

		const passwordComplexityMessages = this.buildPasswordComplexityMessages();
		this.buildChangePasswordValidators();

		if (this.props.resetPassword.changePassword.success === true) {
			resetPasswordView = React.createElement(ChangePasswordSuccessView);
		}
		else if (this.props.resetPassword.securityQuestion.success === true) {
			resetPasswordView = React.createElement(ChangePasswordView,
				{
					...this.props,
					onFormChange: this.handleChangePasswordFormChange,
					onFormSubmit: this.handleChangePasswordFormSubmit,
					passwordComplexityMessages: passwordComplexityMessages
				}) as any;
		}
		else if (this.props.resetPassword.verifyToken.success === true) {
			resetPasswordView = React.createElement(SecurityQuestionView,
				{
					...this.props,
					onFormChange: this.handleSecurityQuestionFormChange,
					onFormSubmit: this.handleSecurityQuestionFormSubmit
				})  as any;;
		}
		else if (this.props.resetPassword.verifyToken.loading === true) {
			resetPasswordView = React.createElement(VerifyTokenLoadingView);
		}
		else if (this.props.resetPassword.verifyToken.error === true) {
			resetPasswordView = React.createElement(VerifyTokenFailureView);
		}


		if (resetPasswordView !== null) {
			return React.createElement(ResetPasswordLayout, null, resetPasswordView);
		}

		return null;
	}

	/**
	 * @function setupChangePasswordValidators
	 * Setups up the change password validators based on the required password
	 * complexity options.
	 */
	private buildChangePasswordValidators = () => {
		(<any>this.changePasswordValidators.newPassword).validators = BuildComplexityValidators(this.props.resetPassword.changePassword.complexity);

		(<any>this.changePasswordValidators.confirmPassword).validators = {
			type: ValidationTypes.Compare,
			options: {
				dataType: CompareDataTypes.String,
				operator: CompareOperators.Equal,
				compareValue: this.props.resetPassword.changePasswordForm.newPassword.value
			}
		};
	}

	/**
	 * @function buildPasswordComplexityMessages
	 * 
	 * @returns {Array{Component}}
	 */
	private buildPasswordComplexityMessages = () => {
		const complexityMessages: any[] = [];

		const { complexity } = this.props.resetPassword.changePassword;

		if (!complexity) {
			return complexityMessages;
		}

		if (complexity.excludeUsername === true) {
			const message = this.complexityValidationMessages.excludeUsername;
			complexityMessages.push(message);
		}

		if (complexity.minLength && complexity.minLength > 0) {
			const message = this.complexityValidationMessages.minimumLength(complexity.minLength);
			complexityMessages.push(message);
		}

		if (complexity.minUpperCase && complexity.minUpperCase > 0) {
			const message = this.complexityValidationMessages.containsUpperCase(complexity.minUpperCase);
			complexityMessages.push(message);
		}

		if (complexity.minLowerCase && complexity.minLowerCase > 0) {
			const message = this.complexityValidationMessages.containsLowerCase(complexity.minLowerCase);
			complexityMessages.push(message);
		}

		if (complexity.minNumber && complexity.minNumber > 0) {
			const message = this.complexityValidationMessages.containsInteger(complexity.minNumber);
			complexityMessages.push(message);
		}

		if (complexity.minSymbol && complexity.minSymbol > 0) {
			const message = this.complexityValidationMessages.containsNonAlphaNumeric(complexity.minSymbol);
			complexityMessages.push(message);
		}

		return complexityMessages;
	}

	/**
	 * @function handleSecurityQuestionFormChange
	 * The function handles the change events from the security question form.
	 * It will validate the changed field and call a prop action to set the
	 * state of the changed field.
	 * 
	 * @param {object} e - The event that caused the change.
	 * @param {object} data - The data from the change.
	 * 
	 */
	private handleSecurityQuestionFormChange = (e :any, data :any) => {
		const targetField = e.target.name;
		const fieldValue = e.target.value;

		let fieldIsValid = true;

		const validators = this.securityQuestionValidators;

		if (validators.hasOwnProperty(targetField)) {
			fieldIsValid = Validate(fieldValue,
				validators[e.target.name].required,
				validators[e.target.name].validators);
		}

		this.props.onSecurityQuestionFormChange(targetField, fieldValue, fieldIsValid);
	}

	/**
	 * @function handleSecurityQuestionFormSubmit
	 * The function handles the form submit request from the security question 
	 * form. It will validate the current form, if the form is valid it will call
	 * the onVerifySecurityQuestion action.
	 */
	private handleSecurityQuestionFormSubmit = () => {
		const formIsValid = ValidateForm(this.props.resetPassword.securityQuestionForm,
			<any>this.securityQuestionValidators,
			this.props.onSecurityQuestionFormChange);

		if (formIsValid) {
			this.props.onVerifySecurityQuestion(this.props.resetPassword.securityQuestionForm.answer.value);
		}
	}

	/**
	 * @function handleSecurityQuestionFormChange
	 * The function handles the change events from the change password form.
	 * It will validate the changed field and call a prop action to set the
	 * state of the changed field.
	 * 
	 * @param {object} e - The event that caused the change.
	 * @param {object} data - The data from the change.
	 * 
	 */
	private handleChangePasswordFormChange = (e :any, data :any) => {
		const targetField = e.target.name;
		const fieldValue = e.target.value;

		let fieldIsValid = true;

		const validators = this.changePasswordValidators;

		if (validators.hasOwnProperty(targetField)) {
			fieldIsValid = Validate(fieldValue,
				validators[e.target.name].required,
				validators[e.target.name].validators);
		}

		this.props.onChangePasswordFormChange(targetField, fieldValue, fieldIsValid);
	}

	/**
	 * @function handleSecurityQuestionFormSubmit
	 * The function handles the form submit request from the security question 
	 * form. It will validate the current form, if the form is valid it will call
	 * the onChangePassword action.
	 */
	private handleChangePasswordFormSubmit = () => {
		const formIsValid = ValidateForm(this.props.resetPassword.changePasswordForm,
			<any>this.changePasswordValidators,
			this.props.onChangePasswordFormChange
		);

		if (formIsValid) {
			this.props.onChangePassword(this.props.resetPassword.changePasswordForm.confirmPassword.value);
		}
	}
}

/** 
 * @member {object} ResetPassword.propTypes
 *  
 * @property {PropType} resetPassword
 * 	This component uses the state from the ResetPasswordReducer. 
 * @property {PropType} intl
 * 	This component the uses the injectIntl props from react-intl.
 * @property {PropType} match.params.token
 * 	The verify password reset token from url courtesy of react router 
 * @property {PropType} onVerifyToken 					
 * 	Action to attempt to verify the password reset token.
 * @property {PropType} onSecurityQuestionFormChange
 * 	Action to handle changes to the security question form.
 * @property {PropType} onVerifySecurityQuestion
 * 	Action to attempt to verify the user's anwser to the security question.
 * @property {PropType} onChangePasswordFormChange
 * 	Action to handle changes to the change password form.
 * @property {PropType} onChangePassword
 * 	Action to attempt to change the user's password.
 *
 * @see /src/reducers/ResetPasswordReducer.js
 *  This component uses the state from the ResetPasswordReducer.
 * @see /src/creators/ResetPasswordActions.js
 *  This component uses the actions from the ResetPasswordActions.
 * @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md
 * 	This component uses 'match' props from React Router
 */
// tslint:disable-next-line
ResetPasswordContainer['propTypes'] = {
	resetPassword: PropTypes.shape({
		securityQuestionForm: PropTypes.shape({
			answer: PropTypes.shape({
				value: PropTypes.string,
				isValid: PropTypes.bool,
				touched: PropTypes.bool
			})
		}),
		changePasswordForm: PropTypes.shape({
			newPassword: PropTypes.shape({
				value: PropTypes.string,
				isValid: PropTypes.bool,
				touched: PropTypes.bool
			}),
			confirmPassword: PropTypes.shape({
				value: PropTypes.string,
				isValid: PropTypes.bool,
				touched: PropTypes.bool
			})
		}),
		verifyToken: PropTypes.shape({
			loading: PropTypes.bool,
			success: PropTypes.bool,
			error: PropTypes.bool,
		}),
		securityQuestion: PropTypes.shape({
			question: PropTypes.string,
			loading: PropTypes.bool,
			success: PropTypes.bool,
			error: PropTypes.bool
		}),
		changePassword: PropTypes.shape({
			loading: PropTypes.bool,
			success: PropTypes.bool,
			error: PropTypes.bool,
			complexity: PropTypes.shape({
				excludeUsername: PropTypes.bool,
				minLength: PropTypes.number,
				minLowerCase: PropTypes.number,
				minNumber: PropTypes.number,
				minSymbol: PropTypes.number,
				minUpperCase: PropTypes.number
			})
		})

	}),
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string
		})
	}),
	intl: PropTypes.shape({
		formatMessage: PropTypes.func
	}),
	onVerifyToken: PropTypes.func,
	onSecurityQuestionFormChange: PropTypes.func,
	onVerifySecurityQuestion: PropTypes.func,
	onChangePasswordFormChange: PropTypes.func,
	onChangePassword: PropTypes.func
}

/** 
 * @member {object} ResetPassword.defaultProps
 * Default props for testing purposes.
 */
// tslint:disable-next-line
ResetPasswordContainer['defaultProps'] = {
	resetPassword: {
		securityQuestionForm: {
			answer: { value: '', isValid: true, touched: false }
		},
		changePasswordForm: {
			newPassword: { value: '', isValid: true, touched: false },
			confirmPassword: { value: '', isValid: true, touched: false }
		},
		verifyToken: {
			loading: false,
			success: false,
			error: false
		},
		securityQuestion: {
			question: '',
			loading: false,
			success: false,
			error: false
		},
		changePassword: {
			loading: false,
			success: false,
			error: false,
			complexity: {
				excludeUsername: true,
				minLength: 0,
				minLowerCase: 0,
				minNumber: 0,
				minSymbol: 0,
				minUpperCase: 0
			}
		}
	},
	intl: {
		formatMessage: () => (undefined),
	},
	onVerifyToken: () => (undefined),
	onSecurityQuestionFormChange: () => (undefined),
	onVerifySecurityQuestion: () => (undefined),
	onChangePasswordFormChange: () => (undefined),
	onChangePassword: () => (undefined)
}
/**
 * @function mapStateToProps
 * 
 * Maps Redux state to the props of this component. 
 * 
 * @see /src/reducers/ResetPasswordnReducer.js
 *  This component uses the state from the ResetPasswordnReducer.
 * 
 * @param state - The Redux state
 */
const mapStateToProps = (state :any) => ({ resetPassword: state.ResetPassword });

/**
 * @function mapDispatchToProps
 * Binds our Redux actions to the props of this component.
 * 
 * @param dispatch - Redux dispatcher
 * @param {function} onVerifyToken 					
 * 	Action to attempt to verify the password reset token from the url.
 * @param {function} onSecurityQuestionFormChange
 * 	Action to handle changes to the security question form.
 * @param {function} onVerifySecurityQuestion
 * 	Action to verify the user's answer to their security question.
 * @param {function} onChangePasswordFormChange
 * 	Action to handle changes to the change password form.
 * @param {function} onChangePassword
 * 	Action to handle the user requesting to change their password. 
 * 
 * @see /src/creators/ResetPasswordActions.js
 */
const mapDispatchToProps = (dispatch :any) =>
	bindActionCreators({
		onVerifyToken,
		onSecurityQuestionFormChange,
		onVerifySecurityQuestion,
		onChangePasswordFormChange,
		onChangePassword
	},
		dispatch
	);

/** 
 * @exports ResetPasswordContainer
 * Exports the ResetPasswordContainer components and decorates its Redux props.
 */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetPasswordContainer);

