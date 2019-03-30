import { IFramesExtractor } from "lib/render/IFramesExtractor";
import { GLFrame } from "lib/render/GL";
import { APIPost } from './service/API';
import { Project } from "lib/render/Types";
import { JPEGFrame } from "lib/streams/RGB24toJPEG";
import * as THREE from 'three';
import { FrameType } from "fw/Frame";

export class APIFramesExtractor implements IFramesExtractor<JPEGFrame> {
	constructor(private project: Project) {}

	async get(i: number): Promise<GLFrame[]> {
		let body = {
			project: this.project,
			i: i,
		};

		const resp = await APIPost(`/api/render/preview/`, JSON.stringify(body), {headers: {'Content-Type': 'application/json'}});

		console.log(resp);

		if (resp.status === 200 && resp.data.length) {

			let promises = (resp.data as string[]).map((frame64: string) => {
				let img = new Image;
				let texture = new THREE.Texture(img);
				return new Promise<GLFrame>((resolve) => {
					img.onload = () => {
						console.log(`Texture #${i} is loaded`);
						texture.needsUpdate = true;
						resolve(new GLFrame(img.width, img.height, i / this.project.settings.FPS, i, FrameType.GL, texture));
					};
					img.src = frame64;
				});
			});

			return Promise.all(promises);
		}

		return [];
	}
}
