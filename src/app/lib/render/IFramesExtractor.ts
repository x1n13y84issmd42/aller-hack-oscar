import { GLFrame } from 'lib/render/GL';
import { RGBA32Frame } from 'lib/ffmpeg';

export interface IFramesExtractor {
	get(t: number): Promise<GLFrame[]>;
}
