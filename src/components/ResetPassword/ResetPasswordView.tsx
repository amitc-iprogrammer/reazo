import * as React from 'react';
import { Form, Icon, Message, Popup, List, Button } from 'semantic-ui-react';
import { ChangePasswordViewProps, ResetPasswordProps } from './types/ResetPasswordView';
import './ResetPasswordView.css';
/**
 * @function VerifyTokenLoadingView
 * Component to notify the user we are in the process of verifying their 
 * password reset token.
 * 
 * @exports 
 * @returns {JSX}
 */
export const VerifyTokenLoadingView = (): JSX.Element =>
	(
		<Message>
			We are trying to verify the reset password token
		</Message>
	)

/**
 * @function VerifyTokenFailureView
 * Component to notify the user we unable to validate password reset token.
 * 
 * @exports 
 * 
 * @returns {JSX}
 */
const options = [
	{ key: 'm', text: 'Male', value: 'male' },
	{ key: 'f', text: 'Female', value: 'female' },
	{ key: 'o', text: 'Other', value: 'other' },
]
export const VerifyTokenFailureView = (): JSX.Element =>
	(
		// <Message negative>
		// 	There was a problem verifying the provided recovery token.
		// </Message>
		<div className="login-wrapper">
			<div className="login-cnt">
				<div className="left">
					<a className="logo-login">
						<img src={require('../../images/login-logo.png')} />
					</a>
					<div className="text-instructions">Instructions to set new password.</div>
					<div className="ullogin-points">
						<List items={[
							'Between 8 to 32 characters in length.',
							'At least 1 uppercase alphabetic character.',
							'At least 1 lowercase alphabetic character.',
							'At least 1 number OR 1 special character (!#$%_-).',
							'Space(s) may be used but cannot be at the beginning or end of the password or phrase.',
							'Cannot be 1 of the previous 5 passwords.'
						]} />
					</div>
					<div className="text-note">Note: Passwords are case-sensitive.</div>
				</div>
				<div className="right">
					<div className="title-signin title-reset">Reset your password</div>
					<div className="signin-before">Letâ€™s update your security settings for <br /><b>adamcovert@reazo.com</b></div>


					<div className="login-formCnt sign-form">
						<Form>
							<Form.Field>
								<label className="iconInp">
									<img src={require('../../images/icon-email.png')} />
								</label>
								<input type="password" className="inp" placeholder='new password' />
							</Form.Field>
							<Form.Field>
								<label className="iconInp">
									<img src={require('../../images/icon-password.png')} />
								</label>
								<input type="password" className="inp" placeholder='Confirm new password' />
							</Form.Field>
							<label className="text-security">Security Question</label>
							<Form.Select
								fluid
								// label='Gender'
								options={options}
								className="iconSelect"
								placeholder='Select security question'
							/>
							<Form.TextArea placeholder='Answer' className="anstextarea" />
							<Button type='submit'>Submit</Button>

						</Form>

					</div>

				</div>
				<div className="clearfix"></div>
			</div>
			<div className="clearfix"></div>
		</div>
	)

/**
 * @function ChangePasswordSuccessView
 * Component to notify the user we successfully changed their password.
 * 
 * @exports 
 * @returns {JSX}
 */

export const ChangePasswordSuccessView = (): JSX.Element =>
	(
		<Message positive>
			Your password has been successfully changed!
		</Message>

	)

/**
 * @function ForgotPasswordView
 * This component renders a security question form that prompts the user to
 * answer their security question before being allowed to change their password. 
 *
 * @exports 
 * 
 * @param {object} props 
 * 
 * @returns {JSX}
 */
export const SecurityQuestionView: React.StatelessComponent<ResetPasswordProps> =
	(props: ResetPasswordProps) =>
		(
			<Form onSubmit={props.onFormSubmit}>
				<Message icon>
					<Icon name='question' />
					{props.resetPassword.securityQuestion.question}
				</Message>
				<Form.Input
					placeholder='Anwser'
					label='Anwser'
					type='text'
					icon='key'
					iconPosition='left'
					name='answer'
					onChange={props.onFormChange}
					value={props.resetPassword.securityQuestionForm.answer.value}
					error={!props.resetPassword.securityQuestionForm.answer.isValid}
				/>
				<Message
					icon
					negative
					hidden={!props.resetPassword.securityQuestion.error}
				>
					<Icon name='exclamation circle' />
					<Message.Content>
						<Message.Header>
							Sorry, that answer is incorrect.
						</Message.Header>
					</Message.Content>
				</Message>
				<Form.Button
					content='Submit'
					type='submit'
					loading={props.resetPassword.securityQuestion.loading}
					primary
					fluid
				/>

			</Form>
		)

/**
 * @function ChangePasswordView
 * This component renders a change password form that prompts the user to
 * change their password. It support notifying the user of password complexity rules,
 * showing users invalid fields, and notifiying the user that their password change failed.
 *
 * @exports 
 * 
 * @param {object} props 
 * 
 * @returns {JSX}
 */
export const ChangePasswordView: React.StatelessComponent<ChangePasswordViewProps> =
	(props: ChangePasswordViewProps) =>
		(
			<Form onSubmit={props.onFormSubmit}>
				<Popup
					trigger={
						<Form.Field
							error={!props.resetPassword.changePasswordForm.newPassword.isValid}
							icon='key'
							iconPosition='left'
						>
							<label>
								New Password
							</label>
							<input
								type='password'
								name='newPassword'
								placeholder='New Password'
								onChange={props.onFormChange as any}
								value={props.resetPassword.changePasswordForm.newPassword.value} />
						</Form.Field>
					}
					position='bottom right'
					size='mini'
					wide
					header='Your new password must'
					content={props.passwordComplexityMessages &&
						<ul>
							{props.passwordComplexityMessages.map((value: { message: string }, index: number) => (<li key={index}>{value.message}</li>))}
						</ul>
					}
					on='focus' />
				<Form.Input
					placeholder='Confirm Password'
					label='Confirm Password'
					type='password'
					name='confirmPassword'
					onChange={props.onFormChange}
					value={props.resetPassword.changePasswordForm.confirmPassword.value}
					error={!props.resetPassword.changePasswordForm.confirmPassword.isValid} />
				<Message
					icon
					negative
					hidden={!props.resetPassword.changePassword.error}>
					<Icon name='exclamation circle' />
					<Message.Content>
						<Message.Header>
							Sorry, your password does not meet the password complexity policy.
						</Message.Header>
					</Message.Content>
				</Message>
				<Form.Button
					content='Change Password'
					type='submit'
					primary
					fluid
					loading={props.resetPassword.changePassword.loading}
				/>
			</Form>
		)
