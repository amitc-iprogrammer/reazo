import { ImplicitCallback, SecureRoute } from '@okta/okta-react';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import DashboardContainer from '../Dashboard/DashboardContainer';
import LayoutContainer from '../Layout/LayoutContainer';
import LoginContainer from '../Login/LoginContainer';
import ResetPasswordContainer from '../ResetPassword/ResetPasswordContainer';
import WelcomeContainer from '../Welcome/WelcomeContainer';
// import InitialLogin from '../Login/InitialLogin';
import './AppView.css';
const AppView: React.StatelessComponent =
	(props) =>
		(
			<LayoutContainer>
				<Switch>
					<Route path='/' exact={true} component={LoginContainer} />
					{/* <Route path='/InitialLogin' exact component={InitialLogin} /> */}
					<Route path='/login' exact component={LoginContainer} />
					<Route path='/welcome/:userId' exact component={WelcomeContainer} />
					<Route path='/reset-password/:token' exact component={ResetPasswordContainer} />
					<SecureRoute path='/dashboard' exact={true} render= {DashboardContainer} />
					<Route path='/implicit/callback' exact={true} component={ImplicitCallback} />
				</Switch>
			</LayoutContainer>
		)

export default AppView;
