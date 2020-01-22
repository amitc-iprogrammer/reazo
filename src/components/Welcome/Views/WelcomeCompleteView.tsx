import * as React from 'react';

// import * as React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

export const WelcomeCompleteView = (): JSX.Element =>
	(
		<Segment placeholder color='violet'>
			<Header icon>
				<Icon name='spinner' loading color='violet' />
				Logging in...
			</Header>
		</Segment>
		// <>
		// </>
	)