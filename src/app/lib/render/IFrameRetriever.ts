import { Project } from 'lib/render/Project';
import { GLFrame } from 'lib/render/3';

export interface IFramesRetriever {
	get(project: Project, t: number): Promise<GLFrame[]>;
}
