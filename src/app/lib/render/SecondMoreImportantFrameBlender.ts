import { FrameBlender } from 'lib/render/FrameBlender';
import { FrameType } from 'fw/Frame';
import { RGB24Frame } from 'lib/ffmpeg';

class SecondMoreImportantFrameBlender implements FrameBlender<RGB24Frame> {
  blendFrames(f1: RGB24Frame, f2: RGB24Frame): RGB24Frame {
    return f2;
  }

  getDefaultFrame(): RGB24Frame {
    return new RGB24Frame(
      0, 0, 0,
      FrameType.pixels,
      new Buffer([])
    );
  }
}
