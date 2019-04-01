import {TTransform} from 'fw/TTransform';
import {GLFrame} from 'lib/render/GL';
import {RGB24Frame} from 'lib/ffmpeg';
import {FrameType} from 'fw/Frame';
import * as THREE from 'three.js-node';

export class RGB24toGL extends TTransform<RGB24Frame, GLFrame> {
	
	_transform(rgbFrame: RGB24Frame, encoding: string, callback: Function): void {
		let texture = new THREE.DataTexture(rgbFrame.data, rgbFrame.width, rgbFrame.height, THREE.RGBFormat);
		texture.needsUpdate = true;

		this.log(rgbFrame.vt.toFixed(2));
		
		this.push(new GLFrame(
			rgbFrame.width,
			rgbFrame.height,
			rgbFrame.vt,
			rgbFrame.vi,
			rgbFrame.ct,
			rgbFrame.ci,
			FrameType.GL,
			texture
		));

		callback();
	}
}
