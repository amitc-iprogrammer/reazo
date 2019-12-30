import * as React from 'react';
import { Form, Icon, Input, Message, Popup } from 'semantic-ui-react';
import { WelcomePasswordViewProps } from './types/WelcomePasswordViewProps';

export const WelcomePasswordView: React.StatelessComponent<WelcomePasswordViewProps> =
	(props: WelcomePasswordViewProps) =>
		(
			<React.Fragment>
				<Form error={props.form.error}>
					<Form.Input
						name={props.form.fields.oldPassword.id}
						id={props.form.fields.oldPassword.id}
						icon='key'
						iconPosition='left'
						placeholder='Password'
						label='Password'
						type='password'
						onChange={(e) => props.onFormChange(props.form.id, e, null)}
						value={props.form.fields.oldPassword.value}
						error={props.form.fields.oldPassword.error}
						disabled={props.form.loading}
					/>
					<Popup
						trigger={
							<Form.Field
								error={props.form.fields.newPassword.error}
								label='New Password'
								type='password'
								control={Input}
								name={props.form.fields.newPassword.id}
								id={props.form.fields.newPassword.id}
								placeholder='New Password'
								onChange={(e: any) => props.onFormChange(props.form.id, e, null)}
								value={props.form.fields.newPassword.value !== null ? props.form.fields.newPassword.value : undefined}
								disabled={props.form.loading}
							/>
						}
						position='bottom right'
						size='mini'
						wide
						header='Your new password must'
						content={props.passwordComplexityMessages &&
							<ul>
								{props.passwordComplexityMessages.map((value: string, index: number) => (<li key={index}>{value}</li>))}
							</ul>
						}
						on='focus'
					/>
					<Form.Input
						name={props.form.fields.confirmNewPassword.id}
						id={props.form.fields.confirmNewPassword.id}
						placeholder='Confirm Password'
						label='Confirm Password'
						type='password'
						onChange={(e) => props.onFormChange(props.form.id, e, null)}
						value={props.form.fields.confirmNewPassword.value}
						error={props.form.fields.confirmNewPassword.error}
						disabled={props.form.loading}
					/>
					<Form.Button
						content='Change Password'
						icon='key'
						type='submit'
						color='violet'
						fluid
						loading={props.form.loading}
						disabled={props.form.loading}
						onClick={(e) => props.onFormSubmit(props.form.id) }
					/>
					<Message
						error
						icon
					>
						<Icon name='exclamation circle' />
						<Message.Content>
							<Message.Header>
								Oops!
							</Message.Header>
							{props.form.errorMessage}
						</Message.Content>
					</Message>

				</Form>
			</React.Fragment>
		)