import { Request, Response } from 'express';

import auth from 'lib/auth';

export default {
	login: function (req: Request, res: Response) {
		try {
			const authUrl = auth.getAuthenticationURL();
			res.redirect(authUrl);
		} catch (error) {
			console.error(`_login_`, error);
		}
	},

	logout: function (req: Request, res: Response) {
		// TODO: logout
		res.status(200).json({}).end();
	},

	confirm: async function (req: Request, res: Response) {
		await auth.authenticate(req);
		res.redirect('/dashboard');
	},
};
