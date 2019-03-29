import { IFramesExtractor } from "lib/render/IFramesExtractor";
import { GLFrame } from "lib/render/GL";
import { APIPost } from './service/API';
import { Project } from "lib/render/Types";
import { JPEGFrame } from "lib/streams/RGB24toJPEG";

export class APIFramesExtractor implements IFramesExtractor<JPEGFrame> {
	constructor(private project: Project) {}

	async get(t: number): Promise<GLFrame[]> {
		let body = {
			project: this.project,
			t: t,
		};

		const resp = await APIPost(`/api/render/preview/`, JSON.stringify(body), {headers: {'Content-Type': 'application/json'}});

		console.log(resp);

		return [];
	}
}
