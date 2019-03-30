import { GLFrame } from 'lib/render/GL';
import { RGBA32Frame } from 'lib/ffmpeg';

export interface IFramesExtractor<FT> {
	get(i: number): Promise<FT[]>;
}
