import * as React from 'react';
import {  Message, Segment } from 'semantic-ui-react';

export const VerifyUserIdLoadingView = (): JSX.Element =>
	(
		<Segment placeholder color='violet'>
			{/* <Header icon>
				<Icon name='spinner' loading color='violet' />
				Verifying your account information...
    	</Header> */}
		</Segment>
	)

export const VerifyUserIdFailureView = (): JSX.Element =>
	(
		<Message negative>
			There was a problem verifying your account information.
		</Message>
	)
