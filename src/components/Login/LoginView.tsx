
import './ForgotPasswordView.css';
import * as React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';
import { ForgotPasswordViewProps, LoginViewProps } from './types/LoginView';
import * as PropTypes from 'prop-types';

/**
 * @function LoginView
 * This component renders a login form with a username and password field. 
 * It has support for submitting the form, showing the user that form fields
 * are invalid, and showing * a message to notify the user that their login 
 * attempt failed. It also has * a toggle meant to be user to show the forgot
 * password form.
 * 
 * @exports 
 * 
 * @param {object} props 
 * 
 * @returns {JSX}
 */
export const LoginView = (props: LoginViewProps) =>
	(

		<>

			<div className="ui left demo vertical inverted sidebar labeled icon menu">
				<a className="item">
					<i className="home icon"></i>
					Home
  </a>
				<a className="item">
					<i className="block layout icon"></i>
					Topics
  </a>
				<a className="item">
					<i className="smile icon"></i>
					Friends
  </a>
			</div>
			<div className="loginWrapper">
				{console.log('werwerer', props)}
				<div className="logincnt">
					<div className="left">
						<a href="javascript:void()" className="logo">
							<img src={require('../../images/reazo-logo.png')} />
						</a>
						<h1 className="hd-title">Welcome to <b><span>Reazo!</span></b></h1>
						<p className={props.onStateChange.showWelcomeContent ? "login-p show" : "login-p"}>
							At Reazo.com you will find useful discussion topics about buying and selling real estate, using real estate as investments, buying foreclosures and flipping houses, financing real estate purchases and additional tools to help buyers and sellers as they prepare to make real estate decisions.
						</p>
						<a onClick={props.showWelcomeContent} href="#." className="downarrow-mobile">
							{props.onStateChange.showWelcomeContent ? <img src={require('../../images/up-arrow-mobile.png')} /> : <img src={require('../../images/down-arrow-mobile.png')} />}
						</a>
						<div className="button-group">
							{/* <Button className="btn-knowmore">Know more...</Button> */}
							<a href="https://admin.reazo.com/" className="btn-knowmore">Know more...</a>
							<div className="clearfix" />
						</div>
					</div>
					<div className="right">

						<div
							//  hidden={!props.authentication.loginError}
							className={props.onStateChange.errorMessage ? "login-error show-error" : "login-error"}>
							<div className="close-circle">
								<img src={require('../../images/icon-close-circle.png')} />
							</div>

							{!props.authentication.form.password.isValid || !props.authentication.form.username.isValid ?
								<div className="cnt">
									<p className="one"> Please fill all the fields.</p>
								</div>
								:
								<div className="cnt">
									<p className="one"> Incorrect email address and/or password.</p>
									<p className="two">Please try again.</p>
								</div>
							}

							<a onClick={props.handleCloseError} className="closeAnch" href="javascript:void()">
								<img src={require('../../images/icon-close.png')} />
							</a>
							<div className="clearfix" />
						</div>
						{/* </Message> */}
						<div className="title-signin">Sign in</div>
						<div className="signin-before">Before we begin, please login to your account</div>
						<div className="login-formCnt">
							<Form onSubmit={props.onFormSubmit}>
								<Form.Field>
									<label className="iconInp">
										<img src={require('../../images/icon-email.png')} />
									</label>
									<input type="text" onChange={props.onFormChange} name="username" className={props.onStateChange.emailClassAdd ? "inp focus" : !props.authentication.form.username.isValid ? "inp empError" : 'inp '} placeholder='Email address'
										value={props.authentication.form.username.value}
										error={!props.authentication.form.username.isValid}
									/>
									<span className="spanError">{props.onStateChange.emailValidationErrorMessage}</span>
								</Form.Field>
								<Form.Field>
									<label className="iconInp">
										<img src={require('../../images/icon-password.png')} />
									</label>
									<label className="iconEye iconEyeLogin">
										{props.onStateChange.passwordVisibilityToggle ?
											<img onClick={props.handlePasswordVisibility} src={require('../../images/icon-eye.png')} /> :
											<img onClick={props.handlePasswordVisibility} src={require('../../images/icon-eye-close.png')} />}
									</label>
									<input type={!props.onStateChange.passwordVisibilityToggle ? "password" : "text"} name="password" onChange={props.onFormChange}
										value={props.authentication.form.password.value}
										error={!props.authentication.form.password.isValid}
										className={props.onStateChange.passwordClassAdd ? "inp focus" : !props.authentication.form.password.isValid ? "inp empError" : 'inp '} placeholder='Password' />
								</Form.Field>
								<Form.Field>
									<a href="javascript:void()" onClick={props.onForgotPasswordToggle} className="anch-forgot">Forgot your password?</a>
								</Form.Field>
								<Button loading={props.authentication.loggingIn} type='submit'>Sign in</Button>
							</Form>
							<div className="text-dont">Don't have a Reazo account?<a href="javascript:void()"> sign up now!</a></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);

/**
* @member {object} LoginView.propTypes
	*
* @property {PropType} authentication
	* 	This component uses the state from the AuthenticationReducer.
* @property {function} onFormSubmit
	* 	Called when the user submits the form.
* @property {function} onFormChange
	* 	Called when the user changes the form.
* @property {function} onForgotPasswordToggle
	* 	Called when the user clicks 'Forgot Password'.
	*
	* @see /src/reducers/AuthenticationReducer.js
	*  This component uses the state from the AuthenticationReducer.
	*/
LoginView.propTypes =
{
	authentication: PropTypes.shape({
		form: PropTypes.shape({
			username: PropTypes.shape({
				value: PropTypes.string,
				isValid: PropTypes.bool
			}),
			password: PropTypes.shape({
				value: PropTypes.string,
				isValid: PropTypes.bool
			})
		}),
		loggingIn: PropTypes.bool,
		loginError: PropTypes.bool,
	}),
	onFormSubmit: PropTypes.func,
	onFormChange: PropTypes.func,
	onForgotPasswordToggle: PropTypes.func
}

/**
 * @member {object} LoginView.defaultProps
			* Default props for testing purposes.
			*/
LoginView.defaultProps = {
	authentication: {
		form: {
			username: { value: '', isValid: true },
			password: { value: '', isValid: true }
		},
		loggingIn: false
	},
	onFormSubmit: () => (undefined),
	onFormChange: () => (undefined),
	onForgotPasswordToggle: () => (undefined),
} as any;

/**
 * @function ForgotPasswordView
 * This component renders a forgot password form with a username field.
 * It has support for submitting the form, showing the user that form fields
 * are invalid, and showing a message to notify the user that their forgot password
 * attempt failed. It also has a toggle meant to be user to show the login form.
 *
 * @exports
 *
 * @param {object} props
			*
 * @returns {JSX}
			*/
export const ForgotPasswordView = (props: ForgotPasswordViewProps) =>
	(

		<div className="forgot-wrapper">
			{console.log('ereerrerre', props.authentication.form.username.isValid)}
			<div className="forgot-cnt">
				<div className="content">
					<div className="cntForgot">
						<a href="#." className="logo-forgot">
							<img src={require('../../images/logo-forgot.png')} />
						</a>

						<h1 className="title-forgot">Forgot Password?</h1>

						<div className="forgot-number">
							<div className="circle active">1</div>
							<div className="circle-line" />
							<div className="circle">2</div>
							<div className="circle-line" />
							<div className="circle">3</div>
							<div className="clearfix" />
						</div>
						<Message
							icon={true}
							negative={true}
							hidden={!props.authentication.form.forgotPasswordError}>
							<Icon name='exclamation circle' />
							<Message.Content>
								<Message.Header>
									Sorry, something went wrong.'
				</Message.Header>
							</Message.Content>
						</Message>
						<p className="text-worry">Don't Worry!</p>
						<p className="text-worry-everyone">Everyone forgets their password now and then. Just type the email address you used for signup and we will send you the reset link. </p>
						<div className="forgot-form-wrap">
							<div className="sign-form">
								<Form onSubmit={props.onFormSubmit}>
									<Form.Field>
										<label className="iconInp">
											<img src={require('../../images/icon-email.png')} />
										</label>
										<input type="text" name='username'
											onChange={props.onFormChange}
											value={props.authentication.form.username.value}
											error={!props.authentication.form.username.isValid}
											className={props.onStateChange.emailClassAdd ? "inp focus" : !props.authentication.form.username.isValid ? "inp empError" : 'inp'} placeholder='Enter your registered email address' />
										<span className="spanError">{props.onStateChange.emailValidationErrorMessage}</span>
									</Form.Field>
									<Button type='submit' className="btnBasic"
										loading={props.authentication.form.forgotPasswordLoading}>Send reset password instructions </Button>

								</Form>
								<div className="text-dont">Back to  <a onClick={props.onForgotPasswordToggle} href="#."><u>sign in</u></a></div>
								<div className="clearfix" />
							</div>
							<div className="clearfix" />
						</div>

					</div>
				</div>
				<div className="clearfix" />
			</div>
			<div className="clearfix" />
		</div>

	);

/**
* @member {object} ForgotPasswordView.propTypes
	*
	* @exports
	*
* @property {PropType} authentication
	* 	This component uses the state from the AuthenticationReducer.
* @property {function} onFormSubmit
	* 	Called when the user submits the form.
* @property {function} onFormChange
	* 	Called when the user changes the form.
* @property {function} onForgotPasswordToggle
	* 	Called when the user clicks 'Login'.
	*
	* @see /src/reducers/AuthenticationReducer.js
	*  This component uses the state from the AuthenticationReducer.
	*/
ForgotPasswordView.propTypes =
{
	authentication: PropTypes.shape({
		form: PropTypes.shape({
			username: PropTypes.shape({
				value: PropTypes.string,
				isValid: PropTypes.bool
			}),
			forgotPasswordLoading: PropTypes.bool,
			forgotPasswordError: PropTypes.bool
		}),
	}),
	onFormSubmit: PropTypes.func,
	onFormChange: PropTypes.func,
	onForgotPasswordToggle: PropTypes.func
}

/**
 * @member {object} ForgotPasswordView.defaultProps
			* Default props for testing purposes.
			*/
ForgotPasswordView.defaultProps = {
	authentication: {
		form: {
			username: { value: '', isValid: true }
		},
		forgotPasswordLoading: false,
		forgotPasswordError: false
	},
	onFormSubmit: () => (undefined),
	onFormChange: () => (undefined),
	onForgotPasswordToggle: () => (undefined),
} as any;

/**
 * @function ForgotPasswordSuccessView
 * This component renders a message notifying the user that we have sent them
 * a forgot password recovery email.
 *
 * @exports
 *
 * @returns {JSX}
			*/
export const ForgotPasswordSuccessView = (props: ForgotPasswordViewProps) =>
	(
		<>
			<Message
				icon={true}
				positive={true}
			>
				<Icon name='exclamation circle' />
				<Message.Content>
					<Message.Header>
						We have sent you a recovery email.
			</Message.Header>
				</Message.Content>
			</Message>

			<div className="forgot-wrapper">
				<div className="forgot-cnt">
					<div className="content">
						<div className="cntForgot">
							<a href="#." className="logo-forgot">
								<img src={require('../../images/logo-forgot.png')} />
							</a>

							<h1 className="title-forgot">Forgot Password?</h1>

							<div className="forgot-number">
								<div className="circle active">1</div>
								<div className="circle-line"></div>
								<div className="circle active">2</div>
								<div className="circle-line"></div>
								<div className="circle">3</div>
								<div className="clearfix"></div>
							</div>
							<p className="text-worry">Security Question</p>
							<p className="text-worry-everyone">	Answer forgotten password challenge	</p>
							<div className="forgot-form-wrap">
								<div className="sign-form">
									<p className="text-favourite">What is your favourite movie quote?</p>
									<Form>
										<Form.Field>
											<label className="iconEye">
												<img src={require('../../images/icon-eye.png')} />
											</label>
											<input type="text" className="inp inpLeft inpRight"
												onChange={props.onFormChange} placeholder='Answer' />
										</Form.Field>
										<Button type='submit'>Continue to reset password </Button>

									</Form>
									<div className="text-dont">Back to  <a onClick={props.onForgotPasswordToggle} href=""><u>sign in</u></a></div>
									<div className="clearfix"></div>
								</div>
								<div className="clearfix"></div>
							</div>

						</div>
					</div>
					<div className="clearfix"></div>
				</div>
				<div className="clearfix"></div>
			</div>
		</>
	)




