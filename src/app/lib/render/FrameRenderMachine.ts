import gl = require('gl');
import * as Types from 'lib/render/Types';
import { VideosRepo } from 'lib/render/VideosRepo';
import { EffectsRepo } from 'lib/render/EffectsRepo';
import { FrameExtractor } from 'lib/render/FrameExtractor';
import { FrameBlender } from 'lib/render/FrameBlender';

export class FrameRenderMachine<V, F> {

  private gl: WebGLRenderingContext;

  constructor(
    private project: Types.Project,
    private videosRepo: VideosRepo<V>,
    private effectsRepo: EffectsRepo<F>,
    private frameExtractor: FrameExtractor<V, F>,
    private frameBlender: FrameBlender<F>,
    private webgl?: WebGLRenderingContext
  ) {
    this.gl = webgl || gl(project.settings.width, project.settings.height, {
      preserveDrawingBuffer: true
    });
  }

  render(timestamp: number): F {
    // RenderMachine treat last timeline as most important,
    // but in project first timeline is most important,
    // so we must revers timelines array.
    let timelines = this.project.timelines.reverse();

    let targetVideoIdsWithOffsetsAndEffects =
      this.getVideoIdWithOffsetAndEffects(timelines, timestamp);

    let targetFramesWithEffects =
      this.getFramesWithEffects(targetVideoIdsWithOffsetsAndEffects);

    let processedFrames: F[] = [];

    for (let fae of targetFramesWithEffects) {
      let workingFrame = fae.frame;

      for (let effect of fae.effects) {
        workingFrame =
          this.effectsRepo.getEffectById(effect.id).processFrame(
            workingFrame, effect.settings);
      }

      processedFrames.push(workingFrame);
    }

    let finalFrame = this.frameBlender.getDefaultFrame();

    for (let frame of processedFrames) {
      finalFrame = this.frameBlender.blendFrames(finalFrame, frame);
    }

    return finalFrame;
  }

  getVideoIdWithOffsetAndEffects(
    timelines: Types.Timeline[],
    timestamp: number
  ):
    VideoWithOffsetAndEffects[]
  {
    let result: VideoWithOffsetAndEffects[] = [];

    for (let timeline of timelines) {
      for (let clip of timeline.entities) {
        if (clip.timelinePosition.start <= timestamp &&
            clip.timelinePosition.end >= timestamp
        ) {
          let fromTimelineStartOffset =
            timestamp - clip.timelinePosition.start;

          result.push({
            videoId: clip.videoId,
            offset: clip.videoPosition.start + fromTimelineStartOffset,
            effects: clip.effects
          } as VideoWithOffsetAndEffects);
        }
      }
    }

    return result;
  }

  getFramesWithEffects(
    vofs: VideoWithOffsetAndEffects[]
  ):
    FrameWithEffects<F>[]
  {
    let result: FrameWithEffects<F>[] = [];

    for (let vof of vofs) {
      result.push({
        frame: this.frameExtractor.extractFrame(
          this.videosRepo.getVideo(vof.videoId),
          vof.offset),
        effects: vof.effects
      } as FrameWithEffects<F>);
    }

    return result;
  }
}

type VideoWithOffsetAndEffects = {
  videoId: string,
  offset: number,
  effects: Types.EffectDesc[]
}

type FrameWithEffects<F> = {
  frame: F,
  effects: Types.EffectDesc[]
}
