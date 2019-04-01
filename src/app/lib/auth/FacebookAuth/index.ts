import FB from 'fb';

export interface IFacebookAppToken {
	accessToken: string;
	expires: number;
}

export interface IFacebookUserToken extends IFacebookAppToken {
	tokenType: string
}

export interface IFacebookUser {
	id: string,
	name: string,
	token: IFacebookUserToken,
}

/**
 * Facebook Auth implementation.
 */
class FacebookAuth {
	private appToken: IFacebookAppToken;

	constructor(private appId: string, private appSecret: string, private redirectUri: string) {
		FB.options({ appId, appSecret, redirectUri });
	}

	public me(userToken: IFacebookUserToken): Promise<IFacebookUser> {
		return new Promise((resolve, reject) => {
			try {
				FB.api('/me', { access_token: userToken.accessToken }, (res) => {
					if (res && res.error) {
						if (res.error.code === 'ETIMEDOUT') {
							return reject(new Error('Request Timeout'));
						}
						else {
							return reject(new Error(res.error));
						}
					}
					return resolve(res);
				});
			} catch (error) {
				console.error(`_AuthApp_Error_`, error);
				return reject(error);
			}
		});
	}

	public logout(userToken: IFacebookUserToken): void {
		// TODO: logout in Facebook
	}

	public refrechUserToken(): void {
		// TODO: refresh using Facebook API
	}

	public getAuthenticationURL(): string {
		try {
			return FB.getLoginUrl({ scope: 'email,user_videos,publish_video' });
		} catch (error) {
			console.error(`_GetAuthenticationURL_`, error);
		}
	}

	public async authUser(code: string): Promise<IFacebookUser> {
		return new Promise((resolve, reject) => {
			try {
				FB.api('oauth/access_token', {
					client_id: this.appId,
					client_secret: this.appSecret,
					redirect_uri: this.redirectUri,
					code
				}, async (res) => {
					if (!res || res.error) {
						const error = res && res.error || `Error while getting the user access token`;
						console.error(`_AuthUser_Error_`, error);
						return reject(new Error(error));
					}
					const { access_token, expires_in = 0, token_type } = res;

					const userToken: IFacebookUserToken = {
						accessToken: access_token,
						expires: expires_in,
						tokenType: token_type,
					}
					const userData = await this.me(userToken);

					const user: IFacebookUser = {
						...userData,
						token: userToken,
					}

					return resolve(user);
				});
			} catch (error) {
				console.error(`_AuthUser_`, error);
				return reject(error);
			}
		});
	}

	public authApp(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				FB.api('oauth/access_token', {
					client_id: this.appId,
					client_secret: this.appSecret,
					redirect_uri: this.redirectUri,
					grant_type: 'client_credentials'
				}, (res) => {
					if (!res || res.error) {
						const error = res && res.error || `Error while getting the app access token`;
						console.error(`_AuthApp_Error_`, error);
						return reject(new Error(error));
					}
					const { access_token, expires = 0 } = res;
					this.appToken = {
						accessToken: access_token,
						expires: expires,
					}
					FB.setAccessToken(this.appToken.accessToken);
					return resolve();
				});
			} catch (error) {
				console.error(`_AuthApp_Error_`, error);
				return reject(error);
			}
		});
	}
}

export default FacebookAuth;
