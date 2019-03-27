import * as Types from 'lib/render/Types';

export interface Effect<F> {
  processFrame(frame: F, settings: Types.EffectSetting[]): F;
}
