import * as moment from 'moment';
import * as React from 'react';
import { Grid, Icon, Image, Label, Segment } from 'semantic-ui-react';

const LoginLayout: React.StatelessComponent<LoginLayoutProps> =
	(props: LoginLayoutProps) =>
		(
			<Grid doubling columns='1' centered>
				<Grid.Column mobile={16} tablet={8} computer={6}>
					<Image
						src='https://www.reazo.com/hs-fs/hubfs/Reazo-Logo-Black-1.png?width=800&name=Reazo-Logo-Black-1.png'
						size='medium'
						centered
						
					/>
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

export default LoginLayout