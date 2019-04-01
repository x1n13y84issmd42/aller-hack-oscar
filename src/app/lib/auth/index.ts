import * as express from 'express';

import FacebookAuth, { IFacebookUser } from './FacebookAuth';

let FB: FacebookAuth;

const auth = {
	getAuthenticationURL: function () {
		return FB.getAuthenticationURL();
	},

	authenticate: async function (req: express.Request) {
		const { code } = req.query;
		const userToken: IFacebookUser = await FB.authUser(code);
		req.session.user = userToken;
	},

	logout: function (request: express.Request) {
		// TODO: logout
	},

	/**
	 * Straps the auth service on the app start.
	 */
	bootstrap: async function () {
		const { FB_APP_ID, FB_APP_SECRET, APP_URL } = process.env;
		FB = new FacebookAuth(FB_APP_ID, FB_APP_SECRET, `${APP_URL}/api/auth/confirm`);
		await FB.authApp();
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
				reject(new Error('No `user` in session'));
			}
		});
	},

	/**
	 * The middleware to use on protected routes that require authentication.
	 * @param req Express Request instance.
	 * @param res Express Response instance.
	 * @param next A closure to continue execution after the middleware.
	 */
	middleware: function(req: express.Request, res: express.Response, next) {
		if (!req.session || !req.session.user) {
			res.redirect('/api/auth/login'); // TODO: Check expired token
		}
		next();
	},
};

export default auth;
