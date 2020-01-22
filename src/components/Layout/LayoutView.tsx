import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Button, Container, Dimmer, Dropdown, Header, Icon, Menu, Message, Modal, Segment, Statistic } from 'semantic-ui-react';
import { LayoutViewProps, TopMenuProps } from './types/LayoutView';

/**
 * @function TopMenuUser
 * 
 * This pure component renders information about the authentication status of the user.
 * There are four state that the component will respond to: the user
 * is in the process of authenticating, the user in is the process of logging out,
 * the user is authenticated, or the user is not authenticated.
 * 
 * TODO: It would be nice to refactor the if() blocks out of this method
 * into the LayoutContainer component.
 * 
 * @exports TopMenuUser Export for testing purposes.
 * 
 * @param {object} 	props 					
 * 	The props for this component
 * @param {boolean} props.authenticating
 * 	The user is in the process of authenticating
 * @param {boolean} props.loggingOut
 * 	The user is in the process of logging out
 * @param {boolean} props.authenticated 
 * 	The user is authenticated
 * @param props.session.claims.name
 * 	The name of the authenticated user
 * @param {function} props.onLogout
 * 	Requests to be logged out of the current session.
 * 
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 * 
 * @returns {JSX}
 */
export const TopMenuUser: React.StatelessComponent<TopMenuProps> =
	(props: TopMenuProps) => {
		if (props.authenticating === true) {
			return (
				<Menu.Menu position='right'>
					<Menu.Item>
						<Icon name='circle notched' loading />
						Authenticating...
				</Menu.Item>
				</Menu.Menu>
			)
		}
		else if (props.loggingOut === true) {
			return (
				<Menu.Menu position='right'>
					<Menu.Item>
						<Icon name='circle notched' loading />
						Logging Out..
				</Menu.Item>
				</Menu.Menu>
			)
		}
		else if (props.authenticated === true) {
			return (
				<Menu.Menu position='right'>
					<Dropdown item text={props.session ? (props.session as any).claims.name : ''}>
						<Dropdown.Menu>
							<Dropdown.Item onClick={props.onLogout}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			)
		}
		else {
			return null;
		}

	}

/**
 * @function TopMenu
 * 
 *  This pure component renders a top menu bar. It also renders
 *  the TopMenuUser component.
 * 
 * @exports TopMenu Export for testing purposes.
 * 
 * @param {object} 	props 					
 * 	The props for this component
 * @param {boolean} props.authenticating
 * 	The user is in the process of authenticating
 * @param {boolean} props.loggingOut
 * 	The user is in the process of logging out
 * @param {boolean} props.authenticated 
 * 	The user is authenticated
 * @param props.session.claims.name
 * 	The name of the authenticated user
 * @param {function} props.onLogout
 * 	Requests to be logged out of the current session.
 * 
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 * 
 * @see /src/components/Layout/LayoutView.js/TopMenuUser
 *  This component renders the TopMenuUser component.
 * 
 * @returns {JSX}
 */
export const TopMenu: React.StatelessComponent<TopMenuProps> =
	(props: TopMenuProps) =>
		(
			// <Menu
			// 	inverted
			// 	borderless
			// 	color='violet'
			// 	style={{ borderRadius: '0'
			// }}
			// >
			// 	<Menu.Header>
			// 		<Image 
			// 			src='https://www.reazo.com/hs-fs/hubfs/Website%20-%20Reazo/Reazo-Full-Text-White.png?width=336&name=Reazo-Full-Text-White.png'
			// 		 size='small' 
			// 		 style={{paddingLeft:'.5em', paddingTop:'.25em' , paddingBottom:'.25em'}} 
			// 		/>
			// 	</Menu.Header>
			// 	<TopMenuUser {...props} />
			// </Menu>
			<>
			</>
		)
/** 
 * @member {object} TopMenu.propTypes
 * 
 * @property {PropType} onLogout
 * 	This prop is passed in as a Redux action. It called when user requests to 
 * 	be logged out of their session.
 * @property {boolean} authenticating
 * 	The user is in the process of authenticating
 * @property {boolean} loggingOut
 * 	The user is in the process of logging out
 * @property {boolean} authenticated 
 * 	The user is authenticated
 * @property {object} session
 * 	The name of the authenticated user
 * 
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 */


/**
 * @function LayoutView
 * 
 *  The component renders the overall layout of the application.
 *  It contains all markup that should be rendered for any route within the 
 *  application. 
 * 
 * @param {object} 	props 					
 * 	The props for this component
 * @param {boolean} props.authenticating
 * 	The user is in the process of authenticating
 * @param {boolean} props.loggingOut
 * 	The user is in the process of logging out
 * @param {boolean} props.authenticated 
 * 	The user is authenticated
 * @param props.session.claims.name
 * 	The name of the authenticated user
 * @param {function} props.onLogout
 * 	Requests to be logged out of the current session.
 * @param {object} authentication
 * 	This component uses the state from the AuthenticationReducer. 
 * @param {object} layout
 * 	This component uses the state from the LayoutReducer. 
 * @param {Array<Component>} children
 * 	Child components to render.
 * 
 * @see /src/reducers/AuthenticationReducer.js
 *  This component uses the state from the AuthenticationReducer.
 * 
 * @see /src/components/Layout/LayoutView.js/TopMenuUser
 *  This component renders the TopMenuUser component.
 * 
 * @returns {JSX}
 */
const LayoutView: React.StatelessComponent<LayoutViewProps> =
	(props: LayoutViewProps) =>
		(
			<div>
				<TopMenu {...props.authentication} onLogout={props.onLogout} />
				<Container fluid={true}>
					<CSSTransition
						in={props.layout.message.visible}
						timeout={500}
						classNames='layout-message' >
						<Message
							icon={props.layout.message.icon !== '' ? true : false}
							onDismiss={props.onDismissMessage}
							positive={props.layout.message.positive as any}
							negative={!props.layout.message.positive as any}
							hidden={!props.layout.message.visible as any}
						>
							<Icon name={props.layout.message.icon as any} />
							<Message.Content>
								<Message.Header>{props.layout.message.header}</Message.Header>
								{props.layout.message.text}
							</Message.Content>
						</Message>
					</CSSTransition>
					<Dimmer.Dimmable as={Segment} basic dimmed={props.layout.dimmer.visible}>
						<Dimmer active={props.layout.dimmer.visible}>
							<Header as='h2' icon inverted>
								<Icon name={props.layout.dimmer.icon as any} loading={props.layout.dimmer.loading} />
								{props.layout.dimmer.header}
								<Header.Subheader>{props.layout.dimmer.text}</Header.Subheader>
							</Header>
						</Dimmer>
						{props.children}
					</Dimmer.Dimmable>
					<Modal
						open={props.authentication.showSessionExpireWarning && !props.authentication.showInactivityTimeoutWarning}
						basic
						inverted
						size='tiny'
					>
						<Modal.Content style={{ textAlign: 'center' }}>
							<Statistic inverted>
								<Statistic.Value>{props.authentication.sessionExpiresInSeconds}</Statistic.Value>
								<Statistic.Label>Your session is about to timeout!</Statistic.Label>
							</Statistic>
						</Modal.Content>
						<Modal.Actions>
							<Button onClick={props.onLogout} inverted>
								<Icon name='sign out' /> Logout
					</Button>
							<Button color='green' onClick={props.onRefreshSession} inverted>
								<Icon name='checkmark' /> I'm still here
					</Button>
						</Modal.Actions>
					</Modal>
					<Modal
						open={props.authentication.showInactivityTimeoutWarning}
						basic
						inverted
						size='tiny'
					>
						<Modal.Content style={{ textAlign: 'center' }}>
							<Statistic inverted>
								<Statistic.Value>{props.authentication.inactivityTimeoutInSeconds}</Statistic.Value>
								<Statistic.Label>Your session is about to timeout due to inactivity!</Statistic.Label>
							</Statistic>
						</Modal.Content>
					</Modal>
				</Container>
			</div>
		)

export default LayoutView