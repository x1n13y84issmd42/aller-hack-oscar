import FB from 'fb';

export interface IFacebookAppToken {
	accessToken: string;
	expires: number;
}

export interface IFacebookUserToken extends IFacebookAppToken {
	tokenType: string
}

/**
 * Facebook implementation.
 */
class Facebook {
	private appToken: IFacebookAppToken;

	constructor(private appId: string, private appSecret: string, private redirectUri: string) {
		FB.options({ appId, appSecret, redirectUri });
		this.authApp();
	}

	public me(userToken: IFacebookAppToken): void {
		FB.api('/me', { access_token: userToken.accessToken }, (res) => {
			if (res && res.error) {
				if (res.error.code === 'ETIMEDOUT') {
					throw new Error('Request Timeout');
				}
				else {
					throw new Error(res.error);
				}
			}
			return res;
		});
	}

	public getAuthenticationURL(): string {
		try {
			return FB.getLoginUrl({ scope: 'email' });
		} catch (error) {
			console.error(`_GetAuthenticationURL_`, error);
		}
	}

	public authUser(code: string): Promise<IFacebookUserToken> {
		return new Promise((resolve, reject) => {
			try {
				let userToken: IFacebookUserToken;
				FB.api('oauth/access_token', {
					client_id: this.appId,
					client_secret: this.appSecret,
					redirect_uri: this.redirectUri,
					code
				}, (res) => {
					if (!res || res.error) {
						const error = res && res.error || `Error while getting the user access token`;
						console.error(`_AuthUser_Error_`, error);
						reject(error);
					}
					console.log(`_AuthUser_Res_`, res);
					const { access_token, expires_in = 0, token_type } = res;
					userToken = {
						accessToken: access_token,
						expires: expires_in,
						tokenType: token_type,
					}
					resolve(userToken);
				});
			} catch (error) {
				console.error(`_AuthUser_`, error);
				reject(error);
			}
		});
	}

	private authApp(): void {
		FB.api('oauth/access_token', {
			client_id: this.appId,
			client_secret: this.appSecret,
			redirect_uri: this.redirectUri,
			grant_type: 'client_credentials'
		}, (res) => {
			if (!res || res.error) {
				const error = res && res.error || `Error while getting the app access token`;
				console.error(`_AuthApp_`, error);
				throw new Error(error);
			}
			const { access_token, expires = 0 } = res;
			this.appToken = {
				accessToken: access_token,
				expires: expires,
			}
			FB.setAccessToken(this.appToken.accessToken);
		});
	}
}

export default Facebook
