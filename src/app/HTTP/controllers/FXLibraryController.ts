import {Request, Response} from 'express';

const ctrler = {
	index: (req: Request, resp: Response) => {
		return ctrler.index_mock(req, resp);
	},

	index_mock: (req: Request, resp: Response) => {
		let idBase = 3000;
	
		function mockFX(name: string) {
			return {
				id: idBase++,
				name: name,
			}
		};

		resp.status(200).json([
			mockFX('Color Grading'),
			mockFX('Blur'),
			mockFX('Pixelate'),
			mockFX('Vignette'),
		]).end();
	},
};

export default ctrler;
