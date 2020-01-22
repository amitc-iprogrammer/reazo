import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { WelcomePasswordViewProps } from './types/WelcomePasswordViewProps';
// import { Button, Form } from 'semantic-ui-react';
// import { WelcomePasswordViewProps } from './types/WelcomePasswordViewProps';

export const VerifyUserIdLoadingView = (props: WelcomePasswordViewProps) =>
	(
		// <div className="loginWrapper">
		// 	<div className="logincnt">
		// 		<div className="left">
		// 			<a href="javascript:void()" className="logo">
		// 				<img src={require('../../../images/reazo-logo.png')} />
		// 			</a>
		// 			<h1 className="hd-title">Hello <b><span>Adam Covert!</span></b></h1>
		// 			<h1 className="hd-title">Welcome to <b><span>Reazo!</span></b></h1>
		// 			<p className="login-p">
		// 				At Reazo.com you will find useful discussion topics about buying and selling real estate, using real estate as investments, buying foreclosures and flipping houses, financing real estate purchases and additional tools to help buyers and sellers as they prepare to make real estate decisions.
		// 				</p>

		// 		</div>
		// 		<div className="right">

		// 			<div className="login-error" id="login-error">
		// 				<div className="close-circle">
		// 					<img src={require('../../../images/icon-close-circle.png')} />
		// 				</div>
		// 				<div className="cnt">
		// 					<p className="one">Incorrect email address and/or password.</p>
		// 					<p className="two">Please try again.</p>
		// 				</div>
		// 				<a className="closeAnch" href="javascript:void()">
		// 					<img src={require('../../../images/icon-close.png')} />
		// 				</a>
		// 				<div className="clearfix"></div>
		// 			</div>
		// 			<div className="title-signin">Sign in</div>
		// 			<div className="login-formCnt">
		// 				<Form>
		// 					<Form.Field>
		// 						<label className="iconInp">
		// 							<img src={require('../../../images/icon-email.png')} />
		// 						</label>
		// 						<input type="text"
		// 							onChange={(e) => props.onFormChange(props.form.id, e, null)}
		// 							name={props.form.fields.email.id}
		// 							className='inp' placeholder='Email address' />
		// 						{/* <span className="spanError">{props.onStateChange.emailValidationErrorMessage}</span> */}
		// 					</Form.Field>

		// 					{/* <Form.Input
		// 			name={props.form.fields.oldPassword.id}
		// 			id={props.form.fields.oldPassword.id}
		// 			icon='key'
		// 			iconPosition='left'
		// 			placeholder='Password'
		// 			label='Password'
		// 			type='password'
		// 			onChange={(e) => props.onFormChange(props.form.id, e, null)}
		// 			value={props.form.fields.oldPassword.value}
		// 			error={props.form.fields.oldPassword.error}
		// 			disabled={props.form.loading}
		// 		/> */}

		// 					<Form.Field>
		// 						<label className="iconInp">
		// 							<img src={require('../../../images/icon-password.png')} />
		// 						</label>
		// 						<input type="password"
		// 							name={props.form.fields.oldPassword.id}
		// 							id={props.form.fields.oldPassword.id}
		// 							onChange={(e) => props.onFormChange(props.form.id, e, null)}
		// 							value={props.form.fields.oldPassword.value !== null ? props.form.fields.oldPassword.value : undefined}
		// 							error={props.form.fields.oldPassword.error}
		// 							disabled={props.form.loading}
		// 							className='inp' placeholder='Temporary password' />
		// 						{/* <input type="password" name="password"
		// 							// onChange={props.onFormChange} 
		// 							className='inp' placeholder='Temporary password' /> */}
		// 					</Form.Field>

		// 					<Button
		// 						// onClick={(e) => props.onVerifyUserId("d")}
		// 						// onSubmit={props.onFormSubmit}
		// 						type='submit'>Login</Button>
		// 				</Form>
		// 				<div className="text-dont">In case you do not know the temporary password,<br />please contact Reazo <a href="javascript:void()">support team.</a></div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		// <Segment placeholder color='violet'>
		// 	<Header icon>
		// 		<Icon name='spinner' loading color='violet' />
		// 		Verifying your account information...
		// 	</Header>
		// </Segment>
		<>
		</>


	)

export const VerifyUserIdFailureView = (): JSX.Element =>
	(
		<Message >
			There was a problem verifying your account information.
		</Message>

	)
