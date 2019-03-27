import { Effect } from 'lib/render/effects/Effect';

export interface EffectsRepo<F> {
  getEffectById(id: string): Effect<F>
}