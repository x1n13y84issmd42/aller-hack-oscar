import { API } from "./API";
import gl = require('gl');
import * as dom from 'jsdom-global';
import * as THREE from 'three.js-node';
import { Project } from "../Types";
import { RGB24Frame } from "lib/ffmpeg";
import { GLFrame } from "../GL";
import { Effect } from 'lib/render/effects/Effect';
import { EffectSetting } from 'lib/render/Types';

dom();

export class Three implements API<RGB24Frame> {
	private gl: WebGLRenderingContext;
	private three: THREE.WebGLRenderer;

	private scene;
	private camera;

	private currentEffects;
	private currentEffectsSettings;

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
	}

	renderFrames(frames: GLFrame[]) {
		if (frames.length) {
			let frame = frames[0];
			let effects = this.currentEffects[0];
			let effectsSettings = this.currentEffectsSettings[0];

			for (let effectIndex in effects) {
				let effect = effects[effectIndex];
				effect.processFrame(frame, effectsSettings[effectIndex]);
			}
		}
	}

	getFramePixels() {
		var pixels = new Uint8Array(this.project.settings.width * this.project.settings.height * 4);
		this.gl.readPixels(0, 0, this.project.settings.width, this.project.settings.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);

		//	This copies entire pixels and is inefficient from both performance & memory perspective.
		//TODO: optimize this.
		return new Buffer(pixels);
	}

	setEffects(effects: Effect<RGB24Frame>[][], settings: EffectSetting[][][]) {
		this.currentEffects = effects;
		this.currentEffectsSettings = settings;

		for (let currentEffects_i of this.currentEffects) {
			for (let currentEffect of currentEffects_i) {
				currentEffect.setContext(this.three, this.scene, this.camera);
			}
		}
	}
}
