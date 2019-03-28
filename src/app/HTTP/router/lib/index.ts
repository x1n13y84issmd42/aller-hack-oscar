import { Router } from 'express';

import FrameController from 'HTTP/controllers/FrameController';
import VideoLibraryController from 'HTTP/controllers/VideoLibraryController';
import ClipLibraryController from 'HTTP/controllers/ClipLibraryController';
import FXLibraryController from 'HTTP/controllers/FXLibraryController';

import auth from 'lib/auth';

const libRouter: Router = Router();

// libRouter.use(auth.middleware);

libRouter.get('/frames/:videoId', FrameController.getFramesByVideoId);
libRouter.get('/videos', VideoLibraryController.index);
libRouter.get('/clips', ClipLibraryController.index);
libRouter.post('/lib/clip', ClipLibraryController.add);
libRouter.get('/effects', FXLibraryController.index);


export default libRouter;
