var assert = require('assert');
import { Express } from 'express';
import { FromDecoderStreamFrameExtractor }
  from 'lib/render/FromDecoderStreamFrameExtractor';
import * as Types from 'lib/render/Types';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as savepixels from 'save-pixels';
import * as ndarray from 'ndarray';


async function main() {
  let extractor = new FromDecoderStreamFrameExtractor();
  let result = await extractor.extractFrame(
    { path: 'storage/in/25.mp4' } as Types.VideoDesc, 15);

  let fn = `storage/out/test.jpg`;

  let xpixels = new ndarray(result.data, [result.height, result.width, 3]);

  xpixels = xpixels.transpose(1, 0);

  let fileSaveStream = fs.createWriteStream(fn);

  savepixels(xpixels, 'JPEG').pipe(fileSaveStream);

  await new Promise(function (resolve) {
    fileSaveStream.on('finish', () => {
      resolve();
    });
  });
}


export default function (app: Express) {
  return function() {
    return new Promise(async (resolve, reject) => {
      await main();
      resolve();
    });
  }
}
