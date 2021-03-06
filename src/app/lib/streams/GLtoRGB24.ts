import {TTransform} from 'fw/streams';
import {GLFrame} from 'lib/render/GL';
import {RGB24Frame} from 'lib/ffmpeg';
import {FrameType} from 'fw/Frame';
import * as THREE from 'three.js-node';

export class GLtoRGB24 extends TTransform<GLFrame, RGB24Frame> {
	
	_transform(glFrame: GLFrame, encoding: string, callback: Function): void {
		this.log(glFrame.vt.toFixed(2));
		
		this.push(new RGB24Frame(
			glFrame.width,
			glFrame.height,
			glFrame.vt,
			glFrame.vi,
			glFrame.ct,
			glFrame.ci,
			FrameType.GL,
			glFrame.data.image.data
		));

		callback();
	}
}
