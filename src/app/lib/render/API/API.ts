export interface API<FT> {
	getFramePixels(): Buffer;
	renderFrames(frames: FT[]);
}
