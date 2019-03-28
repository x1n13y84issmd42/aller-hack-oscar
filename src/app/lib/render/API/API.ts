import { Effect } from 'lib/render/effects/Effect';
import { EffectSetting } from 'lib/render/Types';


export interface API<FT> {
	getFramePixels(): Buffer;
	renderFrames(frames: FT[]);
	setEffects(effects: Effect<FT>[][], settings: EffectSetting[][][]);
}
