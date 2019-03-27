import { Project } from 'lib/render/Project';
import { GLFrame } from 'lib/render/GL';

export interface IFramesExtractor {
	get(t: number): Promise<GLFrame[]>;
}
