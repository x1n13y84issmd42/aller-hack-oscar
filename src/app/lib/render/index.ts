import gl = require('gl');
import * as THREE from 'three.js-node';
import * as dom from 'jsdom-global';
import { Project } from "lib/render/Project";
import { GLFrame } from 'lib/render/3';

dom();

/**
 * The Render Machine
 * Renders Projects.
 */
export class TheMachine {
	private gl;

	constructor(private project: Project) {
		this.gl = gl(project.settings.width, project.settings.height, {
			preserveDrawingBuffer: true
		});
	}

	render(frame: GLFrame) {
		//TODO: actual rendering of all the Timelines happens here!
		return this.getFramePixels();	//	This goes to the following.
	}

	getFramePixels() {
		var pixels = new Uint8Array(this.project.settings.width * this.project.settings.height * 4)
		this.gl.readPixels(0, 0, this.project.settings.width, this.project.settings.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);

		//	This copies entire pixels and is inefficient from both performance & memory perspective.
		//TODO: optimize this.
		return new Buffer(pixels);
	}
}
