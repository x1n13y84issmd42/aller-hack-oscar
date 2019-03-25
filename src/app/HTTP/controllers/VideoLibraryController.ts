import {Request, Response} from 'express';

const ctrler =  {
	index: (req: Request, resp: Response) => {
		return ctrler.index_mock(req, resp);
	},

	index_mock: (req: Request, resp: Response) => {
		let idBase = 1000;
	
		function mockVideo(title: string) {
			return {
				id: idBase++,
				title: title,
				length: Math.random() * 60 * 5,
			}
		};

		resp.status(200).json([
			mockVideo('VIDEO00001'),
			mockVideo('VIDEO00002'),
			mockVideo('VIDEO00003'),
			mockVideo('VIDEO00004'),
			mockVideo('DCIM-0004'),
			mockVideo('DCIM-0008'),
		]).end();
	},

	upload: function(req: Request, resp: Response) {
		
	}
};

export default ctrler;
