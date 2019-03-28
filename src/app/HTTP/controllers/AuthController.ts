import { Request, Response } from 'express';

import { BootSequence } from 'fw/BootSequence';

export default {
	login: function (req: Request, res: Response) {
		try {
			console.log(`__BootSequence__`, BootSequence);
			// const authUrl = auth.getAuthenticationURL();
			res.redirect('/');
		} catch (error) {
			console.error(`_login_`, error);
		}
	},

	logout: function (req: Request, res: Response) {
		// TODO: logout
		res.status(200).json({}).end();
	},

	confirm: async function (req: Request, res: Response) {
		// await auth.authenticate(req);
		res.redirect('/');
	},
};
