
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Form, Icon, Message } from 'semantic-ui-react';
import { ForgotPasswordViewProps, LoginViewProps } from './types/LoginView';
import InputText from '../atoms/inputText/InputText';
import Button from '../atoms/button/Button'
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

	<div className="wrapper">
	{/*  login */}
	<div className="login-wrapper">
		<div className="login-cnt">
			<div className="content">
				<div className="left">
					<a href="javascript:void()" className="logo-login">
						<img src="images/login-logo.png" />
					</a>
					<h1 className="hd-title">Welcome to <span>Reazo!</span></h1>
					<p className="login-p">
						At Reazo.com you will find useful discussion topics about buying and selling real estate, using real estate as investments, buying foreclosures and flipping houses, financing real estate purchases and additional tools to help buyers and sellers as they prepare to make real estate decisions.
					</p>
					<div className="button-group">
						<a href="javascript:void()" className="btn-knowmore">Know more...</a>
						<div className="clearfix" />	
					</div>
					<a href="javascript:void()" className="downarrow-mobile">
						<img src="images/down-arrow-mobile.png" />
					</a>
					<div className="clearfix" />	
				</div>
				<div className="right">
					<div className="login-error">
						<div className="close-circle">
							<img src="images/icon-close-circle.png" />
						</div>
						<div className="cnt">
							<p className="one">Incorrect email address and/or password.</p>
							<p className="two">Please try again.</p>
						</div>
						<a className="closeAnch" href="javascript:void()">
							<img src="images/icon-close.png" />
						</a>
						<div className="clearfix" />	
					</div>
					<div className="clearfix" />
					<div className="title-signin">Sign in</div>
					<div className="signin-before">Before we begin, please login to your account</div>
					<div className="sign-form">
						<form>
							<div className="signin-row">
								{/* <input type="text" className="emailid" name="" placeholder="Email Address" />
								<img src="images/icon-email.png" className="pos-icon" /> */}
								<InputText type="text" onChange={props.onFormChange} src="images/icon-email.png" 
								value={props.authentication.form.username.value} 
			          error={!props.authentication.form.username.isValid}  imgClassName="pos-icon" className="emailid" name="" placeholder="Email Address"/>
{/* <Form onSubmit={props.onFormSubmit}>
		<Form.Input 
			placeholder={'Email address'}
			className="emailid"
			label={'Email address'}
			name='username'
			icon='mail'
			onChange={props.onFormChange} 
			value={props.authentication.form.username.value} 
			error={!props.authentication.form.username.isValid} 
		/>
		</Form> */}

							</div>
							<div className="signin-row">
								{/* <input type="password" className="emailid" name="" placeholder="Password" />
								<img src="images/icon-password.png" className="pos-icon password" /> */}
								<InputText type="password" src="images/icon-email.png" imgClassName="pos-icon" className="emailid" 
								value="ddddddddddd"
					// error={!props.authentication.form.password.isValid} 
					// onChange={props.onFormChange}
					 name="" placeholder="Password"/>
								
							</div>
							<a href="javascript:void()" className="anch-forgot">Forgot your password?</a>
							{/* <button className="btn-signIn">Sign in</button> */}
							<Button 
							// onClick={props.authentication.loggingIn}
							 className="btn-signIn" label="signIn">signIn</Button>
						</form>
						<div className="text-dont">Don’t have a Reazo account? <a href="javascript:void()">Sign up now!</a></div>
						<div className="clearfix" />	
					</div>
					<div className="clearfix" />	
				</div>
			</div>
			<div className="clearfix" />			
		</div>
		<div className="clearfix" />	
	</div>
	{/*  login */}
</div>

);


// 	<Form onSubmit={props.onFormSubmit}>
// 		<Form.Input 
// 			placeholder={'Email address'}
// 			label={'Email address'}
// 			name='username'
// 			icon='mail'
// 			iconPosition='left'
// 			onChange={props.onFormChange} 
// 			value={props.authentication.form.username.value} 
// 			error={!props.authentication.form.username.isValid} 
// 		/>
// 		<Form.Input 
// 			placeholder={'Password'}
// 			label={'Password'}
// 			icon='lock'
// 			iconPosition='left'
// 			type='password'
// 			name='password'
// 			onChange={props.onFormChange} 
// 			value={props.authentication.form.password.value} 
// 			error={!props.authentication.form.password.isValid} 
// 		/>
// 		<Form.Field 
// 			style={{textDecoration:'underline', color: 'LightSkyBlue', cursor:'pointer', fontSize:'smaller', float:'left', marginTop:'-1em'}}
// 			onClick={props.onForgotPasswordToggle} 
// 		>
// 			Forgot Password?
// 		</Form.Field>
// 		<Message 
// 			icon={true}
// 			negative={true}
// 			hidden={!props.authentication.loginError}>
// 			<Icon name='exclamation circle' />
// 			<Message.Content>
// 				<Message.Header>
// 						Sorry, your login attempt failed.
// 				</Message.Header>
// 			</Message.Content>
// 		</Message>
// 		<Form.Button 
// 			content={'Log In'}
// 			className='loginButton'
// 			color='violet'
// 			fluid={true}
// 			type='submit' 
// 			loading={props.authentication.loggingIn} 
// 		/>
// 	</Form>
// );

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
	authentication: PropTypes.shape( {
		form: PropTypes.shape( { 
			username: PropTypes.shape( { 
				value: PropTypes.string, 
				isValid:PropTypes.bool
				}),
			password: PropTypes.shape( { 
				value: PropTypes.string, 
				isValid:PropTypes.bool
			})
		}),
		loggingIn:PropTypes.bool,
		loginError:PropTypes.bool,
	}),
	onFormSubmit:PropTypes.func, 
	onFormChange:PropTypes.func, 
	onForgotPasswordToggle:PropTypes.func
}

/** 
 * @member {object} LoginView.defaultProps
 * Default props for testing purposes.
 */
LoginView.defaultProps = {
	authentication: {
		form: { 
			username: {value: '', isValid:true},
			password: {value: '', isValid:true}
		},
		loggingIn:false
	},
	onFormSubmit:() => ( undefined ), 
	onFormChange:() => ( undefined ),
	onForgotPasswordToggle:() => ( undefined ), 
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
	<Form onSubmit={props.onFormSubmit}>
		<Form.Input 
			placeholder={'Email address'}
			label={'Email address'}
			name='username'
			icon='mail'
			iconPosition='left'
			onChange={props.onFormChange} 
			value={props.authentication.form.username.value} 
			error={!props.authentication.form.username.isValid} 
		/>
		<Form.Button 
			content={'Reset Password'}
			type='submit' 
			color='violet'
			fluid={true}
			loading={props.authentication.form.forgotPasswordLoading} 
		/>
		<Form.Field 
			style={{textDecoration:'underline', color: 'LightSkyBlue', cursor:'pointer', fontSize:'smaller', marginTop:'-1em'}}
			onClick={props.onForgotPasswordToggle} 
		>	
			Go Back To Login
		</Form.Field>
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
	</Form>
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
	authentication: PropTypes.shape( {
		form: PropTypes.shape( { 
			username: PropTypes.shape( { 
				value: PropTypes.string, 
				isValid:PropTypes.bool
			}),
			forgotPasswordLoading:PropTypes.bool,
			forgotPasswordError:PropTypes.bool
		}),
	}),
	onFormSubmit:PropTypes.func, 
	onFormChange:PropTypes.func, 
	onForgotPasswordToggle:PropTypes.func
}

/** 
 * @member {object} ForgotPasswordView.defaultProps
 * Default props for testing purposes.
 */
ForgotPasswordView.defaultProps = {
	authentication: {
		form: { 
			username: {value: '', isValid:true}
		},
		forgotPasswordLoading:false,
		forgotPasswordError:false
	},
	onFormSubmit:() => ( undefined ), 
	onFormChange:() => ( undefined ),
	onForgotPasswordToggle:() => ( undefined ), 
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
export const ForgotPasswordSuccessView = (): JSX.Element =>
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

);


