var assert = require('assert');
import { Express } from 'express';
import { FromDecoderStreamFrameExtractor }
  from 'lib/render/FromDecoderStreamFrameExtractor';
import * as Types from 'lib/render/Types';


async function main() {
  let extractor = new FromDecoderStreamFrameExtractor();
  let result = await extractor.extractFrame(
    { path: 'C:\\test.mp4' } as Types.VideoDesc, 15);

  console.log(result);
}


export default function (app: Express) {
  return function() {
    return new Promise(async (resolve, reject) => {
      await main();
      resolve();
    });
  }
}
