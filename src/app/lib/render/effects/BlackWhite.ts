import { Effect } from 'lib/render/effects/Effect';
import { RGB24Frame } from 'lib/ffmpeg';
import * as Types from 'lib/render/Types';
import * as ndarray from 'ndarray';


export class BlackWhite implements Effect<RGB24Frame> {

  processFrame(frame: RGB24Frame, settings: Types.EffectSetting[]): RGB24Frame {
    let xpixels = new ndarray(frame.data, [frame.height, frame.width, 3]);
    xpixels = xpixels.transpose(1, 0);

    for(var i = 0; i < xpixels.shape[0]; ++i) {
      for(var j = 0; j < xpixels.shape[1]; ++j) {
        let R = xpixels.get(i, j, 0);
        let G = xpixels.get(i, j, 1);
        let B = xpixels.get(i, j, 2);

        let targetValue = ( (0.3 * R) + (0.59 * G) + (0.11 * B) )

        xpixels.set(i, j, 0, targetValue);
        xpixels.set(i, j, 1, targetValue);
        xpixels.set(i, j, 2, targetValue);
      }
    }

    frame.data = xpixels.data;
    return frame;
  }
}
