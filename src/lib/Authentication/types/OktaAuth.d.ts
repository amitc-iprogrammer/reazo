export interface OktaConfig {
	url: string;
	clientId?: string,
	redirectUri: string;
	baseUri: string;
	issuer?: string;
}

export interface OktaCredentials {
	username: string;
	password: string;
}

export interface OktaTransaction {
	readonly status: string;
	readonly sessionToken: string;

	cancel(): Promise<OktaTransaction>;
}

export interface OktaOAuthOptions {
	responseType: string | string[]
	sessionToken?: string
	scopes?: string | string[]
	redirect_uri :string
}

export interface OktaToken {
	expiresAt: number;
	claims : {
		email :string
		name :string
		preferred_username :string
	}
	idToken : string
	getWithoutPrompt(oauthOptions: OktaOAuthOptions): Promise<any>;
	getWithPopup(oauthOptions: OktaOAuthOptions): Promise<any>;
	getWithRedirect(oauthOptions: OktaOAuthOptions): void
	parseFromUrl(): Promise<any>;
	decode(idTokenString: string): string
	refresh(tokenToRefresh: OktaToken): Promise<OktaToken>;
	getUserInfo(accessTokenObject: string): Promise<any>;
	verify(idTokenObject: string): Promise<any>;
}

export interface OktaTokenManager {
	add(key: string, token: OktaToken): void;
	get(key: string): OktaToken;
	remove(key: string): void;
	clear(): void;
	refresh(key: string): void;
	on(event: 'expired' | 'error' | 'refreshed', callback: Function, context?: any) :any;
	off(event: 'expired' | 'error' | 'refreshed', callback: Function) :any;
}

export interface IOktaAuth {
	token: OktaToken;
	tokenManager: OktaTokenManager;
	constructor(config: OktaConfig) :any;
	signIn(options: OktaCredentials): Promise<OktaTransaction>;
	signOut(): Promise<any>;
	[fn: string]: any;
}

export interface IOktaPasswordComplexity {
	minLength: number;
	minLowerCase: number;
	minUpperCase: number;
	minNumber: number;
	minSymbol : number;
	excludeUsername: boolean;
}



