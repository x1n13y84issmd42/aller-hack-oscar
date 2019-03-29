import { Router } from 'express';
import * as bodyParser from 'body-parser';

import Home from 'HTTP/controllers/Home';

import apiRouter from 'HTTP/router/api';
import staticRouter from 'HTTP/router/static';
import storageRouter from 'HTTP/router/storage';
import { Request, Response } from 'express';
import { Blur } from 'lib/render/effects/Blur';
import { StreamFramesExtractor } from 'lib/render/StreamFramesExtractor';
import { TheMachine } from 'lib/render';
import { MongoVideos } from 'storage/Video/MongoVideos';
import { Three } from 'lib/render/API/3';
import { RGBA32toJPEG } from 'lib/streams';
import { EffectsRepo } from 'lib/render/EffectsRepo';
import { Effect } from 'lib/render/effects/Effect';
import { EffectSetting } from 'lib/render/Types';
import { RGBA32Frame } from 'lib/ffmpeg';


let router: Router = Router();

router.use('/static', staticRouter);
router.use('/storage', storageRouter);

router.use('/api', apiRouter);

router.get('/', Home.index);
router.get('/', Home.dashboard);

// Kill me now
async function frameCtrl(req: Request, resp: Response) {
  let project = req.body.project;
  let millis = req.body.millis;

  let machine = new TheMachine(
    project,
    new StreamFramesExtractor(project, new MongoVideos),
    new Three(project),
    new TempEffectsRepo()
  );

  machine.stream.pipe(new RGBA32toJPEG(project.settings.title));
  let result = await machine.renderFrame(millis / 40, millis / 40 / 25);

  resp.send(`${project.settings.title}/1.jpg`);
  resp.end();
}

class TempEffectsRepo implements EffectsRepo<RGBA32Frame> {

  getEffectById(id: string): Effect<RGBA32Frame> {
    if (id === 'rotating_box') {
      return new Blur();
    } else {
      throw "No effect with such id";
    }
  }
}

router.use(bodyParser());

router.post('/frame', frameCtrl);


export default router;
