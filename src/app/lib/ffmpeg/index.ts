
import {Frame} from 'fw/Frame';

export class RGB24Frame extends Frame<Uint8Array> {}

export class RGBA32Frame extends Frame<Uint8Array> {
	public static fromRGB24Frame(f24: RGB24Frame) {
		let f32 = new RGBA32Frame(f24.width, f24.height, f24.t, f24.type, new Uint8Array(f24.width * f24.height * 4));

		let fn1 = () => {
			let di = 0;
			for (let i=0; i<f24.data.length; i++) {
				f32.data[di++] = f24.data[i];

				if (di % 4 === 0 && di !== 0) {
					f32.data[di++] = 1.0;
				}
			}
		};

		return f32;
	}
}