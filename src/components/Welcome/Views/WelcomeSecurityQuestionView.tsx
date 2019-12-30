import * as React from 'react';
import { Form, Icon, Input, Message, Popup } from 'semantic-ui-react';
import { WelcomeSecurityQuestionViewProps } from './types/WelcomeSecurityQuestionViewProps';

export const WelcomeSecurityQuestionView: React.StatelessComponent<WelcomeSecurityQuestionViewProps> =
	(props: WelcomeSecurityQuestionViewProps) =>
		(
			<React.Fragment>
				<Form error={props.form.error}>
					<Form.Dropdown
						id={props.form.fields.securityQuestion.id}
						name={props.form.fields.securityQuestion.id}
						value={props.form.fields.securityQuestion.value !== null ? props.form.fields.securityQuestion.value : ''}
						error={props.form.fields.securityQuestion.error}
						selection
						onChange={(e: any, data: any) => { props.onFormChange(props.form.id, e, data) }}
						options={props.form.fields.securityQuestion.options}
						label='Security Question'
						placeholder='Security Question'
						disabled={props.form.loading}
					/>
					<Popup
						trigger={
							<Form.Field
								error={props.form.fields.securityAnswer.error}
								label='Security Answer'
								control={Input}
								name={props.form.fields.securityAnswer.id}
								id={props.form.fields.securityAnswer.id}
								placeholder='Security Answer'
								onChange={(e: any) => props.onFormChange(props.form.id, e, null)}
								value={props.form.fields.securityAnswer.value !== null ? props.form.fields.securityAnswer.value : undefined}
								disabled={props.form.loading}
							/>
						}
						position='bottom right'
						size='mini'
						wide
						content='Your security answer must be at least 4 characters long'
						on='focus'
					/>
					<Form.Button
						content='Finish'
						icon='checkered flag'
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