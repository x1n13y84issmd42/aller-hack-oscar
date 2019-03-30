import { API } from "./API";
import gl = require('gl');
import * as dom from 'jsdom-global';
import * as THREE from 'three.js-node';
import { Project } from "../Types";
import { RGB24Frame } from "lib/ffmpeg";
import { GLFrame } from "../GL";

dom();

export class Three implements API<RGB24Frame> {
	private gl: WebGLRenderingContext;
	private three: THREE.WebGLRenderer;

	private scene;
	private camera;

	private plane;
	
	private material;
	private box;

	private boxRotation = 0;

	constructor(private project: Project, webgl?: WebGLRenderingContext) {
		this.gl = webgl || gl(project.settings.width, project.settings.height, {
			preserveDrawingBuffer: true
		});

		this.three = new THREE.WebGLRenderer({
			context: this.gl,
			autoClear: true,
			autoClearColor: true,
		});

		let {width, height} = this.project.settings;
		this.three.setSize(width, height);
		this.three.setClearColor(new THREE.Color(255, 0, 0), 1.0);

		this.scene = new THREE.Scene();

		this.camera = new THREE.OrthographicCamera(-width/2, width/2, -height/2, height/2, 0, 2000);
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 10;

		/////////////////////// THIS IS A TEST ///////////////////////
		this.material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		let boxDim = 270;
		this.box = new THREE.Mesh(new THREE.BoxGeometry(boxDim, boxDim, boxDim), this.material);
		this.box.position.x = -15;
		this.box.position.y = 0;
		this.box.position.z = -20;
		this.box.rotation.x = 0.1;
		this.box.rotation.y = 0.3;
		this.box.rotation.z = 0;
		this.scene.add(this.box);

		////////////////////////////////////////////////////////
	}

	renderFrames(frames: GLFrame[]) {
		if (frames.length) {
			let frame = frames[0];
			this.material.map = frame.data;
			this.box.rotation.z = frame.vt * 0.5;
			this.three.render(this.scene, this.camera);
		}
	}

	getFramePixels() {
		var pixels = new Uint8Array(this.project.settings.width * this.project.settings.height * 4);
		this.gl.readPixels(0, 0, this.project.settings.width, this.project.settings.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);

		//	This copies entire pixels and is inefficient from both performance & memory perspective.
		//TODO: optimize this.
		return new Buffer(pixels);
	}
}
