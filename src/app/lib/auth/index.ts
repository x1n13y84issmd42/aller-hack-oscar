import * as express from 'express';

import Facebook, { IFacebookAppToken } from './Facebook';

let FB: Facebook;

const auth = {
	getAuthenticationURL: function () {
		return FB.getAuthenticationURL();
	},

	getLogoutURL: function () {
		// TODO: DO THIS
	},

	authenticate: async function (req: express.Request) {
		const { code } = req.query;
		const userToken: IFacebookAppToken = await FB.authUser(code);
		console.log(`_Authenticate_UserToken_`, userToken);
		req.session.test = 'test';
	},

	setUser(request: express.Request) {
		// TODO: DO THIS
	},

	logout: function (request: express.Request) {
		// TODO: logout
	},

	me: function (req: express.Request) {
		const { user } = req.session;
		const facebookUser = FB.me(user.token);
		console.log(`_facebookUser_`, facebookUser);
	},

	/**
	 * Straps the auth service on the app start.
	 */
	bootstrap: function () {
		const { FB_APP_ID, FB_APP_SECRET, APP_URL } = process.env;
		FB = new Facebook(FB_APP_ID, FB_APP_SECRET, `${APP_URL}/api/auth/confirm`);
	},

	/**
	 * Initializes the whole thing on every request.
	 */
	init: function (request: express.Request) {
		return new Promise((resolve, reject) => {
			let user = request.session.user;

			if (user) {
				resolve(user);
			} else {
				reject('No `user` in session');
			}
		});
	},

	/**
	 * The middleware to use on protected routes that require authentication.
	 * @param req Express Request instance.
	 * @param res Express Response instance.
	 * @param next A closure to continue execution after the middleware.
	 */
	middleware: function (req: express.Request, res: express.Response, next) {
		// TODO: DO THIS
	},
};

export default auth;
