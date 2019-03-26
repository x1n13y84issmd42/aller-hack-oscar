import { Request, Response } from 'express';

import auth from 'lib/auth';

export default {
	login: function (req: Request, res: Response) {
		try {
			const authUrl = auth.getAuthenticationURL();
			console.info(`_authUrl_`, authUrl);
			res.redirect(authUrl);
		} catch (error) {
			console.error(`_login_`, error);
		}
	},

	logout: function (req: Request, res: Response) {
		console.info(`_logout_req_`, req);
		// TODO: logout
		res.status(200).json({}).end();

	},

	me: function (req: Request, res: Response) {
		auth.me(req);
		res.status(200).end();
	},

	confirm: async function (req: Request, res: Response) {
		await auth.authenticate(req);
		res.status(200).json({}).end();
	},
};
