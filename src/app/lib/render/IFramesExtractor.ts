import { Project } from 'lib/render/Project';
import { GLFrame } from 'lib/render/GL';

export interface IFramesExtractor {
	get(project: Project, t: number): Promise<GLFrame[]>;
}
