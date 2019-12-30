import { Security } from '@okta/okta-react';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import AppContainer from './components/App/AppContainer';
import './css/style.css';
import { oktaConfig } from './lib/Authentication/AuthenticationService';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';

const domTarget = document.getElementById('root');


const handleAuthRequired = ( params :any ) => ( params.history.push('/'));

render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
					<Security 
						issuer={oktaConfig.issuer}
						client_id={oktaConfig.clientId}
						onAuthRequired={ handleAuthRequired }
						redirect_uri={oktaConfig.baseUri} >	
							<AppContainer />
					</Security>
			</ConnectedRouter>
		</Provider>, 
	domTarget
);

registerServiceWorker();
