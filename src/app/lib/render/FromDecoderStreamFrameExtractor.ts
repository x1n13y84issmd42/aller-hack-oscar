import { FrameExtractor } from 'lib/render/FrameExtractor';
import * as Types from 'lib/render/Types';
import { RGB24Frame } from 'lib/ffmpeg';
import { decoder, metaDecoder } from 'streams/Decoder';
import { Writable } from 'stream'


export class FromDecoderStreamFrameExtractor implements FrameExtractor<Types.VideoDesc, Promise<RGB24Frame>> {
  async extractFrame(video: Types.VideoDesc, timestamp: number): Promise<RGB24Frame> {
    let ws = new Writable();

    let result = new Promise(function (resolve, reject) {
      ws._write = function (chunk, enc, next) {
          resolve(chunk);
      };
    });

    let frameRate = (await metaDecoder({ source: video.path } as any)).fps;

    let frameWrapper =
      decoder(
        { source: video.path } as any,
        { from: timestamp / 25, frames: 1 } as any);
    frameWrapper.pipe(ws);

    return await result as RGB24Frame;
  }
}