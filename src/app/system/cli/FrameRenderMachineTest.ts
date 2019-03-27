var assert = require('assert');
import {Express} from 'express';
import * as Types from 'lib/render/Types';
import { IVideos } from 'app/storage/Video/IVideos';
import { FrameRenderMachine } from 'lib/render/FrameRenderMachine';
import { Effect } from 'lib/render/effects/Effect';
import { EffectsRepo } from 'lib/render/EffectsRepo';
import { FrameExtractor } from 'lib/render/FrameExtractor';
import { FrameBlender } from 'lib/render/FrameBlender';


class OneVideoAsNumArrayMock implements IVideos<number[][]> {

  constructor(private id: string, private video: number[][]) {}

  async get(id: string): Promise<number[][]> {
    if (id == this.id) {
      let result = this.video;

      return await new Promise(function (resolve, reject) {
        resolve(result);
      });
    } else {
      throw new ReferenceError(`record with id [${id}] do not exist`);
    }
  }

  put(v: number[][]) {
  }

  all(): Promise<number[][][]> {
    return null;
  }
}

class OneDivideByTwoEffectRepoStub implements EffectsRepo<number[]> {

  constructor(private id: string) {}

  getEffectById(id: string): Effect<number[]> {
    if (id == this.id) {
      return new DivideByTwoEffect();
    } else {
      throw new ReferenceError(`effect with id [${id}] do not exist`);
    }
  }
}

class DivideByTwoEffect implements Effect<number[]> {
  processFrame(frame: number[], settings: Types.EffectSetting[]): number[] {
    let result: number[] = [];

    for (let pixel of frame) {
      result.push(pixel / 2);
    }

    return result;
  }
}

class VideoAsArrayFrameExtractor implements FrameExtractor<number[][], number[]> {
  extractFrame(video: number[][], timestamp: number): number[] {
    return video[timestamp];
  }
}

class SaveOnlySecondFrameBlender implements FrameBlender<number[]> {
  blendFrames(f1: number[], f2: number[]): number[] {
    return f2;
  }

  getDefaultFrame(): number[] {
    return [0, 0, 0];
  }
}


async function main() {
  let videoId = 'TestVideoId';
  let video = [[1, 2, 3], [2, 3, 4]];

  let effectId = 'TestEffectId';

  let project = {
    timelines: [{
      entities: [{
        videoId: videoId,
        timelinePosition: {
          start: 0,
          end: 0
        },
        videoPosition: {
          start: 0,
          end: 0
        },
        effects: [{
          id: effectId,
          settings: []
        }]
      }]
    }, {
      entities: [{
        videoId: videoId,
        timelinePosition: {
          start: 0,
          end: 0
        },
        videoPosition: {
          start: 1,
          end: 1
        },
        effects: [{
          id: effectId,
          settings: []
        }]
      }]
    }],
    settings: {
      width: 640,
      height: 480
    }
  } as Types.Project;

  let renderMachine =
    new FrameRenderMachine<number[][], number[]>(
      project,
      new OneVideoAsNumArrayMock(videoId, video),
      new OneDivideByTwoEffectRepoStub(effectId),
      new VideoAsArrayFrameExtractor(),
      new SaveOnlySecondFrameBlender());


  let renderResult = await renderMachine.render(0);
  assert.deepEqual([0.5, 1, 1.5], renderResult);
}


export default function (app: Express) {
	return function() {
		return new Promise(async (resolve, reject) => {
      await main();
			resolve();
		});
	}
}
