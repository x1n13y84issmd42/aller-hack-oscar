import * as THREE from 'three.js-node';

export type FXSettings = {
	[k: string]: any;
};

export type FXDesc = {
	name: string,
	settings: FXSettings;
}

/* export abstract class FX extends timeline.Event {
	
	constructor(T0: number, T1: number, protected scene: THREE.Scene) {
		super(T0, T1);
	}
} */
