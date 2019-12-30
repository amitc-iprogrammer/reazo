import * as moment from 'moment';
import * as React from 'react';
import { Grid, Icon, Label, Message, Segment } from 'semantic-ui-react';
import { WelcomeLayoutViewProps } from './types/WelcomeLayoutViewProps';

const WelcomeLayoutView = (props: WelcomeLayoutViewProps) =>
	(
		<Grid doubling columns='1' centered>
			<Grid.Column mobile={16} tablet={8} computer={6}>
				{props.showMessage && 
				<Message icon positive={props.messagePositive} >
					<Icon name={props.messageIcon as any} />
					<Message.Content>
						<Message.Header>
							{props.messageHeader}
					</Message.Header>
					{props.messageContent}
					</Message.Content>
				</Message>
				}
				{props.children}
				<Segment basic textAlign='center'>
					<Label basic>
						<Icon name='copyright' fitted />
						&nbsp;
						Reazo
						&nbsp;
					{moment().format('YYYY')}
					</Label>
				</Segment>
			</Grid.Column>
		</Grid>

	)

export default WelcomeLayoutView