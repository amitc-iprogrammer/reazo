import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onFormChange, onFormSubmit, onVerifyUserId } from 'src/actions/WelcomeActions';
import { IOktaPasswordComplexity } from 'src/lib/Authentication/types/OktaAuth';
import StoreState from 'src/reducers/types/StoreState';
import { WelcomeContainerProps } from './types/WelcomeContainerProps';
import { WelcomeLayoutViewProps } from './Views/types/WelcomeLayoutViewProps';
import { WelcomePasswordViewProps } from './Views/types/WelcomePasswordViewProps';
// import { WelcomeSecurityQuestionViewProps } from './Views/types/WelcomeSecurityQuestionViewProps';
import { WelcomeCompleteView } from './Views/WelcomeCompleteView';
import WelcomeLayoutView from './Views/WelcomeLayoutView';
import { WelcomePasswordView } from './Views/WelcomePasswordView';
// import { WelcomeSecurityQuestionView } from './Views/WelcomeSecurityQuestionView';
import { VerifyUserIdFailureView, VerifyUserIdLoadingView } from './Views/WelcomeVerifyUserIdViews';


export class WelcomeContainer extends React.Component<WelcomeContainerProps>
{
	private complexityValidationMessages = {
		excludeUsername: () => ('Not contain your username'),
		minimumLength: (minLength: number) => (`Be at least ${minLength} characters in length`),
		containsLowerCase: (minLowerCase: number) => (`Contain at least ${minLowerCase} lower case characters (a-z)`),
		containsUpperCase: (minUpperCase: number) => (`Contain at least ${minUpperCase} uppercase characters (A-Z)`),
		containsInteger: (minNumber: number) => (`Contain at least ${minNumber} digit (0-9)`),
		containsNonAlphaNumeric: (minSymbol: number) => (`Contain at least ${minSymbol} special characters (punctuation).`)
	};
	public state = {
		passwordVisibilityToggle: false,
		newPasswordEmptyError: false,
		confirmNewPasswordEmptyError: false,
		securityquestionEmpty: false,
		showWelcomeContent: false,
		errorMessage: false
	};
	// private handleTemporaryPasswordSubmit = () => {
	// 	console.log('ddddddddddddddddddd', this.props.onFormSubmit)
	// }
	public componentWillMount() {

		if (this.props.match && this.props.match.params && this.props.match.params.userId) {
			const userId = this.props.match.params.userId;
			this.props.onVerifyUserId(userId);
		}
	}

	public render() {
		console.log('Wel11comeWelcome', this.props.Welcome)
		this.buildPasswordComplexityMessages();
		let welcomeView: (React.SFCElement<any> | null) = null;

		if (this.props.Welcome.verifyUserId.loading === true) {
			welcomeView = React.createElement(VerifyUserIdLoadingView);
		}
		else if (this.props.Welcome.verifyUserId.error === true) {
			welcomeView = React.createElement(VerifyUserIdFailureView);
		}
		else if (this.props.Welcome.verifyUserId.success === true) {
			welcomeView = this.renderCurrentStep();
		}

		const welcomeLayoutProps: WelcomeLayoutViewProps = this.buildLayoutProps(welcomeView);

		return React.createElement(WelcomeLayoutView, welcomeLayoutProps);
	}
	private showWelcomeContent = () => {
		if (!this.state.showWelcomeContent) {
			this.setState({ showWelcomeContent: true })
		} else if (this.state.showWelcomeContent) {
			this.setState({ showWelcomeContent: false })
		}
	}
	private handleCloseError = (e: any) => {
		if (!this.state.errorMessage) {
			this.setState({ errorMessage: true })
		}
	}
	private handlePasswordVisibility = (e: any) => {
		console.log('this.state.passwordVisibilityToggle', this.state.passwordVisibilityToggle)
		if (!this.state.passwordVisibilityToggle) {
			this.setState({ passwordVisibilityToggle: true })
		} else if (this.state.passwordVisibilityToggle) {
			this.setState({ passwordVisibilityToggle: false })
		}
	}
	// private handleEmtyFieldError=()=>{

	// 	if (this.props.Welcome.setPasswordForm.)
	// }
	private buildPasswordComplexityMessages = () => {

		const complexityMessages: string[] = [];

		const complexity: IOktaPasswordComplexity = this.props.Welcome.verifyUserId.passwordComplexity || {
			excludeUsername: true,
			minLength: 12,
			minLowerCase: 32,
			minNumber: 43,
			minSymbol: 0,
			minUpperCase: 54
		}

		if (!complexity) {
			return complexityMessages;
		}

		if (complexity.excludeUsername === true) {
			const message = this.complexityValidationMessages.excludeUsername();
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

	private renderCurrentStep = (): React.SFCElement<any> | null => {

		let currentStep: React.SFCElement<any> | null = null;

		if (this.props.Welcome.setPasswordForm.complete === false) {

			const passwordViewProps: WelcomePasswordViewProps = {
				form: this.props.Welcome.setPasswordForm,
				passwordComplexityMessages: this.buildPasswordComplexityMessages(),
				onFormSubmit: this.props.onFormSubmit,
				onFormChange: this.props.onFormChange,
				showResetPasswordView: this.props.Welcome,
				handlePasswordVisibility: this.handlePasswordVisibility,
				onStateChange: this.state,
				showWelcomeContent: this.showWelcomeContent,
				handleCloseError: this.handleCloseError
			} as any;

			currentStep = React.createElement(WelcomePasswordView, passwordViewProps);

		}
		// else if (this.props.Welcome.setSecurityQuestion.complete === false) {

		// 	const setSecurityQuestionProps: WelcomeSecurityQuestionViewProps = {
		// 		form: this.props.Welcome.setSecurityQuestion,
		// 		onFormSubmit: this.props.onFormSubmit,
		// 		onFormChange: this.props.onFormChange
		// 	}
		// 	currentStep = React.createElement(WelcomeSecurityQuestionView, setSecurityQuestionProps);
		// }
		else {
			currentStep = React.createElement(WelcomeCompleteView, null);
		}

		return currentStep;
	}

	private buildLayoutProps = (children: React.SFCElement<any> | null): WelcomeLayoutViewProps => {

		if (this.props.Welcome.verifyUserId.loading === true ||
			this.props.Welcome.verifyUserId.error === true) {
			return {
				showMessage: false,
				messageHeader: null,
				messageContent: null,
				messageIcon: null,
				messagePositive: false,
				children
			}
		}
		// else if (this.props.Welcome.setPasswordForm.complete === false &&
		// 	this.props.Welcome.setSecurityQuestion.complete === false) {
		// 	return {
		// 		showMessage: true,
		// 		messageHeader: `Welcome ${this.props.Welcome.verifyUserId.accountLogin}!`,
		// 		messageContent: 'Please take a moment to finish setting up your account.',
		// 		messageIcon: 'handshake',
		// 		messagePositive: false,
		// 		children
		// 	}
		// }
		// else if (this.props.Welcome.setPasswordForm.complete === true &&
		// 	this.props.Welcome.setSecurityQuestion.complete === false) {
		// 	return {
		// 		showMessage: true,
		// 		messageHeader: `Your password has been set.`,
		// 		messageContent: "Now, let's setup your password recovery question.",
		// 		messageIcon: 'thumbs up outline',
		// 		messagePositive: true,
		// 		children
		// 	}
		// }
		// else if (this.props.Welcome.setPasswordForm.complete === true &&
		// 	this.props.Welcome.setSecurityQuestion.complete === true) {
		// 	return {
		// 		showMessage: true,
		// 		messageHeader: "We're all done here!",
		// 		messageContent: " We'll log you in and redirect you in a moment.",
		// 		messageIcon: 'flag checkered',
		// 		messagePositive: true,
		// 		children
		// 	}
		// }

		return {
			showMessage: false,
			messageHeader: null,
			messageContent: null,
			messageIcon: null,
			messagePositive: false,
			children
		}
	}
}


const mapStateToProps = (state: StoreState) => ({ router: state.router, Welcome: state.Welcome });

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ onVerifyUserId, onFormChange, onFormSubmit },
		dispatch
	);

/** 
 * @exports ResetPasswordContainer
 * Exports the ResetPasswordContainer components and decorates its Redux props.
 */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomeContainer);