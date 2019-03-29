import { Request, Response } from 'express';

const ctrler = {
	index: (req: Request, resp: Response) => {
		return ctrler.index_mock(req, resp);
	},

	index_mock: (req: Request, resp: Response) => {

		resp.status(200).json([
			{
				id: 'rotating_box',
				name: 'Rotating box',
			},
			{
				id: 'blur',
				name: 'Blur',
			},
			{
				id: 'bw',
				name: 'Black White',
			}
		]).end();
	},
};

export default ctrler;
