import gl = require('gl');
import * as THREE from 'three.js-node';
import * as dom from 'jsdom-global';
import { Project } from "lib/render/Project";
import { GLFrame } from 'lib/render/3';

dom();

interface IFrameRetriever {
	get(project: Project, t: number): GLFrame[];
}

/**
 * The Render Machine
 * Renders Projects.
 */
export class TheMachine {
	private gl;

	constructor(private project: Project, private frameRetriever: IFrameRetriever) {
		this.gl = gl(project.settings.width, project.settings.height, {
			preserveDrawingBuffer: true
		});
	}

	render(timestamp?: number) {

		if (timestamp) {
			this.renderFrame(timestamp);
		} else {
			let frameFrom = 0, frameTo = 1000;
			for (let i = frameFrom; i<frameTo; i++) {
				this.renderFrame(i);
			}
		}
	}

	renderFrame(t: number) {
		//TODO: rendering
		return this.getFramePixels();
	}

	getFramePixels() {
		var pixels = new Uint8Array(this.project.settings.width * this.project.settings.height * 4)
		this.gl.readPixels(0, 0, this.project.settings.width, this.project.settings.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);

		//	This copies entire pixels and is inefficient from both performance & memory perspective.
		//TODO: optimize this.
		return new Buffer(pixels);
	}

	getFramesFromAllTheTimelines(frameIndex: number): GLFrame[] {
		return [];
	}
}

class FileUint8FrameRetriever implements IFrameRetriever {
	get(project: Project, t: number): GLFrame[] {
		return [];
	}
	
}

let machine = new TheMachine(undefined, new FileUint8FrameRetriever());