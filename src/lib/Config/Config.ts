
import { ApplicationConfig } from './types/ApplicationConfig';

const Config :ApplicationConfig = {
	apiUrl: process.env.REACT_APP_REAZO_AGENT_REAZO_API_URL as string,
	oktaIssuer: process.env.REACT_APP_REAZO_AGENT_OKTA_ISSUER as string,
	oktaUrl: process.env.REACT_APP_REAZO_AGENT_OKTA_URL as string,
	oktaBaseUri: process.env.REACT_APP_REAZO_AGENT_OKTA_BASE_URI as string,
	oktaRedirectUri: process.env.REACT_APP_REAZO_AGENT_OKTA_REDIRECT_URI as string,
	oktaClientId: process.env.REACT_APP_REAZO_AGENT_OKTA_CLIENT_ID as string
}

export default Config