//import gl from 'gl';
import gl = require('gl');
import * as THREE from 'three.js-node';
import {Frame} from 'fw/Frame';
import * as dom from 'jsdom-global';

dom();

export class Three {
	private gl;
	private renderer;
	private scene;
	private camera;
	private material;
	
	private plane;
	private box;

	constructor(public width: number, public height: number) {
		this.gl = gl(width, height, {
			preserveDrawingBuffer: true
		});

		this.renderer = new THREE.WebGLRenderer({
			context: this.gl,
			autoClear: true,
			autoClearColor: true,
		});

		this.renderer.setSize(width, height);
		this.renderer.setClearColor(new THREE.Color(255, 0, 0), 1.0);

		this.scene = new THREE.Scene();

		this.camera = new THREE.OrthographicCamera(-width/2, width/2, -height/2, height/2, 0, 2000);
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 10;

		/*
		this.camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 100;
		*/

		this.material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});
		
		this.plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), this.material);
		this.plane.rotation.x = 0.3;
		this.plane.rotation.y = 0.2;

		this.scene.add(this.plane);

		this.addGeometry();
	}

	addGeometry() {
		let material = new THREE.MeshBasicMaterial({
			color: 0xff7700,
		//	wireframe: true
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
	}

	renderFrame(frame: GLFrame) {
		this.material.map = frame.data;

		this.box.rotation.x = frame.t * 0.5;

		this.renderer.render(this.scene, this.camera);

		return this.getFramePixels();
	}

	getFramePixels() {
		var pixels = new Uint8Array(this.width * this.height * 4)
		this.gl.readPixels(0, 0, this.width, this.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);

		//	This copies entire pixels and is inefficient from both performance & memory perspective.
		//TODO: optimize this.
		return new Buffer(pixels);
	}

	getFrameTexture() {
		var pixels = new Uint8Array(this.width * this.height * 4)
		this.gl.readPixels(0, 0, this.width, this.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels)

		let pxls = new Buffer(12);
		
		for (var i=0; i < 12; i++) {
			let b = pixels[i];
			pxls.writeUInt8(b, i);
		}

		let frame = new THREE.DataTexture(pixels, this.width, this.height, THREE.RGBAFormat);
		frame.needsUpdate = true;

		return frame;
	}

	getScene() {
		return this.scene;
	}
}

export class GLFrame extends Frame<THREE.DataTexture> {}
