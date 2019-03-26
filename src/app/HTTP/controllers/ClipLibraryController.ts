import {Request, Response} from 'express';

const ctrler = {
	index: (req: Request, resp: Response) => {
		return ctrler.index_mock(req, resp);
	},

	index_mock: (req: Request, resp: Response) => {
		let idBase = 2000;
	
		function mockClip(vID: number) {
			let t1 = Math.random() * 50;
			return {
				id: idBase++,
				videoID: vID,
				t1: t1,
				t2: t1 + Math.random() * 50,
				URL: '/static/images/clip_mock.jpg'
			}
		};

		resp.status(200).json([
			mockClip(1001),
			mockClip(1001),
			mockClip(1003),
			mockClip(1003),
		]).end();
	},
};

export default ctrler;
