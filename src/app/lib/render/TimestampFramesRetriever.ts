import { IFramesRetriever } from "lib/render/IFrameRetriever";
import { GLFrame } from "lib/render/GL";
import { Project } from "lib/render/Project";

export class TimestampFramesRetriever implements IFramesRetriever {
	get(project: Project, t: number): Promise<GLFrame[]> {
		return new Promise<GLFrame[]>((resolve) => {
			resolve([]);
		});
	}

	private requestFrames(project: Project, t: number) {

	}
}