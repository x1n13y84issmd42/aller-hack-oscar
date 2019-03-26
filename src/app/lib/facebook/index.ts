import FB from 'fb';
import * as fs from 'fs';

import { IFacebookUser } from 'lib/auth/FacebookAuth';

/**
 * Facebook API implementation.
 */
class FacebookAPI {
	constructor(private facebookUser: IFacebookUser) {
	}

	public publishVideo(filePath: string, fileName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				let options = {
					batch: [
						{
							method: 'post',
							relative_url: 'me/videos',
							attached_files: 'file1',
						}
					],
					file1: fs.createReadStream(filePath),
					access_token: this.facebookUser.token.accessToken,
				}
				FB.api('', 'post', options, (res) => {
					if (!res || res.error || res.status >= 400) {
						const error = res && res.error || `Error while upload video for user`;
						console.error(`_PublishVideo_Error_`, error);
						return reject(new Error(error));
					}
					console.log(`_PublishVideo_Res_`, res);
					return resolve()
				});
			} catch (error) {
				console.error(`_PublishVideo_Error_`, error);
				return reject(error);
			}
		});
	}
}

export default FacebookAPI;
