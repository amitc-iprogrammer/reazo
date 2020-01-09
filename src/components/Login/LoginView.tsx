import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Form, Icon, Message, Button } from 'semantic-ui-react';
import { ForgotPasswordViewProps, LoginViewProps, TemporaryPasswordViewProps } from './types/LoginView';

import './ForgotView1.css';


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

		<div className="loginWrapper">
			{console.log('werwerer', props.onStateChange.classAdd)}
			<div className="logincnt">
				<div className="left">
					<a href="javascript:void()" className="logo">
						<img src={require('../../images/reazo-logo.png')} />
					</a>
					<h1 className="hd-title">Welcome to <span>Reazo!</span></h1>
					<p className="login-p">
						At Reazo.com you will find useful discussion topics about buying and selling real estate, using real estate as investments, buying foreclosures and flipping houses, financing real estate purchases and additional tools to help buyers and sellers as they prepare to make real estate decisions.
                </p>
					<div className="button-group">
						<a href="https://admin.reazo.com/" className="btn-knowmore">Know more...</a>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="right">

					<div
						//  hidden={!props.authentication.loginError}
						className={props.onStateChange.errorMessage ? "login-error show-error" : "login-error"}>
						<div className="close-circle">
							<img src={require('../../images/icon-close-circle.png')} />
						</div>
						<div className="cnt">
							<p className="one">Incorrect email address and/or password.</p>
							<p className="two">Please try again.</p>
						</div>
						<a onClick={props.handleCloseError} className="closeAnch" href="javascript:void()">
							<img src={require('../../images/icon-close.png')} />
						</a>
						<div className="clearfix"></div>
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
								<input type="text" onChange={props.onFormChange} name="username" className={props.onStateChange.classAdd ? "inp focus" : 'inp'} placeholder='Email Address'
									value={props.authentication.form.username.value}
									error={!props.authentication.form.username.isValid}
								/>
								<span className="spanError">{props.onStateChange.emailValidationErrorMessage}</span>
							</Form.Field>
							<Form.Field>
								<label className="iconInp">
									<img src={require('../../images/icon-password.png')} />
								</label>
								<input type="password" name="password" onChange={props.onFormChange}
									value={props.authentication.form.password.value}
									error={!props.authentication.form.password.isValid}
									className="inp" placeholder='Password' />
							</Form.Field>
							<Form.Field>
								<a href="javascript:void()" onClick={props.onForgotPasswordToggle} className="anch-forgot">Forgot your password?</a>
							</Form.Field>
							<Button onSubmit={props.onFormSubmit} loading={props.authentication.loggingIn} type='submit'>Sign In</Button>
						</Form>
						<div className="text-dont">In case you do not know the temporary password.<br />Please contact Reazo <a href="javascript:void()">support team</a></div>
					</div>
				</div>
			</div>
		</div>

		// <Form onSubmit={props.onFormSubmit}>
		// 	<Form.Input 
		// 		placeholder={'Email address'}
		// 		label={'Email address'}
		// 		name='username'
		// 		icon='mail'
		// 		iconPosition='left'
		// 		onChange={props.onFormChange} 
		// 		value={props.authentication.form.username.value} 
		// 		error={!props.authentication.form.username.isValid} 
		// 	/>
		// 	<Form.Input 
		// 		placeholder={'Password'}
		// 		label={'Password'}
		// 		icon='lock'
		// 		iconPosition='left'
		// 		type='password'
		// 		name='password'
		// 		onChange={props.onFormChange} 
		// 		value={props.authentication.form.password.value} 
		// 		error={!props.authentication.form.password.isValid} 
		// 	/>
		// 	<Form.Field 
		// 		style={{textDecoration:'underline', color: 'LightSkyBlue', cursor:'pointer', fontSize:'smaller', float:'left', marginTop:'-1em'}}
		// 		onClick={props.onForgotPasswordToggle} 
		// 	>
		// 		Forgot Password?
		// 	</Form.Field>
		// 	<Message 
		// 		icon={true}
		// 		negative={true}
		// 		hidden={!props.authentication.loginError}>
		// 		<Icon name='exclamation circle' />
		// 		<Message.Content>
		// 			<Message.Header>
		// 					Sorry, your login attempt failed.
		// 			</Message.Header>
		// 		</Message.Content>
		// 	</Message>
		// 	<Form.Button 
		// 		content={'Log In'}
		// 		className='loginButton'
		// 		color='violet'
		// 		fluid={true}
		// 		type='submit' 
		// 		loading={props.authentication.loggingIn} 
		// 	/>
		// </Form>
	);

/** 
 * @member {object} LoginView.propTypes
 *  
 * @property {PropType} authentication
 * 	This component uses the state from the AuthenticationReducer. 
 * @property {function} onFormSubmit
 * @property {function} onStateChange 					
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
	onStateChange: PropTypes.func,
	handleTemporaryPasswordFormSubmit: PropTypes.func,
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
	handleTemporaryPasswordFormSubmit: () => (undefined),
	onFormChange: () => (undefined),
	onForgotPasswordToggle: () => (undefined),
} as any;
export const TemporaryPasswordView = (props: TemporaryPasswordViewProps) =>
	(
		console.log('statecheck', props.onStateChange),
		<div className="loginWrapper">
			<div className="logincnt">
				<div className="left">
					<a href="javascript:void()" className="logo">
						<img src={require('../../images/reazo-logo.png')} />
					</a>
					<h1 className="hd-title">Welcome to <span>Reazo!</span></h1>
					<p className="login-p">
						At Reazo.com you will find useful discussion topics about buying and selling real estate, using real estate as investments, buying foreclosures and flipping houses, financing real estate purchases and additional tools to help buyers and sellers as they prepare to make real estate decisions.
                </p>

				</div>
				<div className="right">

					<div className="login-error" id="login-error">
						<div className="close-circle">
							<img src={require('../../images/icon-close-circle.png')} />
						</div>
						<div className="cnt">
							<p className="one">Incorrect email address and/or password.</p>
							<p className="two">Please try again.</p>
						</div>
						<a onClick={props.handleCloseError} className="closeAnch" href="javascript:void()">
							<img src={require('../../images/icon-close.png')} />
						</a>
						<div className="clearfix"></div>
					</div>
					<div className="title-signin">Sign in</div>
					<div className="login-formCnt">
						<Form>
							<Form.Field>
								<label className="iconInp">
									<img src={require('../../images/icon-email.png')} />
								</label>
								<input type="text" onChange={props.onFormChange} name="email" className="inp" placeholder='Email Address' />
								{/* <Form.Input
                                        placeholder={'Email address'}
                                        // label={'Email address'}
                                        className="inp"
                                        type="text"
                                        // name='username'
                                        // icon='mail'
                                        // iconPosition='left'
                                        onChange={this.props.onFormChange}
                                        value={this.props.authentication.form.username.value}
                                        error={!this.props.authentication.form.username.isValid}
                                    /> */}
							</Form.Field>
							<Form.Field>
								<label className="iconInp">
									<img src={require('../../images/icon-password.png')} />
								</label>
								<input type="password" name="password" onChange={props.onFormChange} className="inp" placeholder='Temporary Password' />
							</Form.Field>

							<Button onClick={props.onFormSubmit} type='submit'>Login</Button>
						</Form>
						<div className="text-dont">In case you do not know the temporary password.<br />Please contact Reazo <a href="javascript:void()">support team</a></div>
					</div>
				</div>
			</div>
		</div>
	);

/** 
 * @member {object} TemporaryPasswordView.propTypes
 *  
 * @property {PropType} authentication
 * 	This component uses the state from the AuthenticationReducer. 
 * @property {function} onFormSubmit 	
 * @property {function} handleTemporaryPasswordFormSubmit				
 * 	Called when the user submits the form.
 * @property {function} onFormChange
 * 	Called when the user changes the form.
 * @property {function} onForgotPasswordToggle
 * 	Called when the user clicks 'Forgot Password'.
 *
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 */
TemporaryPasswordView.propTypes =
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
	handleTemporaryPasswordFormSubmit: PropTypes.func,
	onFormChange: PropTypes.func
}

/** 
 * @member {object} TemporaryPasswordView.defaultProps
 * Default props for testing purposes.
 */
TemporaryPasswordView.defaultProps = {
	authentication: {
		form: {
			username: { value: '', isValid: true },
			password: { value: '', isValid: true }
		},
		loggingIn: false
	},
	handleTemporaryPasswordFormSubmit: () => (undefined),
	onFormChange: () => (undefined)
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
		// <Form onSubmit={props.onFormSubmit}>
		// 	<Form.Input
		// 		placeholder={'Email address'}
		// 		label={'Email address'}
		// 		name='username'
		// 		icon='mail'
		// 		iconPosition='left'
		// 		onChange={props.onFormChange}
		// 		value={props.authentication.form.username.value}
		// 		error={!props.authentication.form.username.isValid}
		// 	/>
		// 	<Form.Button
		// 		content={'Reset Password'}
		// 		type='submit'
		// 		color='violet'
		// 		fluid={true}
		// 		loading={props.authentication.form.forgotPasswordLoading}
		// 	/>
		// 	<Form.Field
		// 		style={{ textDecoration: 'underline', color: 'LightSkyBlue', cursor: 'pointer', fontSize: 'smaller', marginTop: '-1em' }}
		// 		onClick={props.onForgotPasswordToggle}
		// 	>
		// 		Go Back To Login
		// </Form.Field>
		// <Message
		// 	icon={true}
		// 	negative={true}
		// 	hidden={!props.authentication.form.forgotPasswordError}>
		// 	<Icon name='exclamation circle' />
		// 	<Message.Content>
		// 		<Message.Header>
		// 			Sorry, something went wrong.'
		// 		</Message.Header>
		// 	</Message.Content>
		// </Message>
		// </Form>
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
							<div className="circle">2</div>
							<div className="circle-line"></div>
							<div className="circle">3</div>
							<div className="clearfix"></div>
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
											className="inp" placeholder='Enter your registered email address' />
									</Form.Field>
									<Button type='submit' className="btnBasic"
										loading={props.authentication.form.forgotPasswordLoading}>Send reset password instructions </Button>

								</Form>
								<div className="text-dont">Back to  <a onClick={props.onForgotPasswordToggle} href="#."><u>sign in</u></a></div>
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



export const ForgotPasswordSecurityQuestionView = (props: ForgotPasswordViewProps) =>
	(
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
										<input type="text" className="inp inpLeft inpRight" placeholder='Answer' />
									</Form.Field>
									<Button type='submit'>Continue to reset password </Button>

								</Form>
								<div className="text-dont">Back to  <a href="#."><u>sign in</u></a></div>
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
	);

/** 
 * @member {object} ForgotPasswordSecurityQuestionView.propTypes
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
ForgotPasswordSecurityQuestionView.propTypes =
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
 * @member {object} ForgotPasswordSecurityQuestionView.defaultProps
 * Default props for testing purposes.
 */
ForgotPasswordSecurityQuestionView.defaultProps = {
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


export const ForgotPasswordSuccessView = () =>
	(
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
	)
