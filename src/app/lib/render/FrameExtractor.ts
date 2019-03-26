export interface FrameExtractor<V, F> {
  extractFrame(video: V, timestamp: number): F;
}