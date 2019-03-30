import {APIFramesExtractor} from './APIFramesExtractor';
import { GLFrame } from 'lib/render/GL';

export class CachingAPIFramesExtractor extends APIFramesExtractor {
	private cache: GLFrame[][] = [];
	async get(i: number) {
		return this.cache[i] || (this.cache[i] = (await super.get(i)).sort((fa, fb) => fa.t - fb.t));
	}
}
