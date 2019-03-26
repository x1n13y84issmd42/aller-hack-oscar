export interface FrameBlender<F> {
  blendFrames(f1: F, f2: F): F;
  getDefaultFrame(): F;
}