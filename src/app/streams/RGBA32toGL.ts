import {TTransform} from 'fw/TTransform';
import {GLFrame} from 'lib/render/GL';
import {RGBA32Frame} from 'lib/ffmpeg';
import {FrameType} from 'fw/Frame';
import * as THREE from 'three.js-node';

export class RGBA32toGL extends TTransform<RGBA32Frame, GLFrame> {
	
	_transform(rgbFrame: RGBA32Frame, encoding: string, callback: Function): void {
		let texture = new THREE.DataTexture(
			rgbFrame.data,
			rgbFrame.width, rgbFrame.height,
			THREE.RGBAFormat,
			THREE.UnsignedByteType,
			THREE.UVMapping,
			THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping,
			THREE.LinearFilter, THREE.LinearMipMapLinearFilte
		);

		texture.needsUpdate = true;

		this.log(rgbFrame.t.toFixed(2));
		
		this.push(new GLFrame(
			rgbFrame.width,
			rgbFrame.height,
			rgbFrame.t,
			FrameType.GL,
			texture
		));

		callback();
	}
}
