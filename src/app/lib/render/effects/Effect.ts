import * as Types from 'lib/render/Types';
import * as THREE from 'three.js-node';

export interface Effect<F> {
	setContext(
		three: THREE.WebGLRenderer,
		scene: THREE.Scene,
		camera: THREE.OrthographicCamera);
	processFrame(frame: F, settings: Types.EffectSetting[]): F;
}
