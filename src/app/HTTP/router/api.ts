import { Router } from 'express';

import VideoLibraryController from 'HTTP/controllers/VideoLibraryController';
import ClipLibraryController from 'HTTP/controllers/ClipLibraryController';
import FXLibraryController from 'HTTP/controllers/FXLibraryController';

import auth from 'lib/auth';

import adminRoute from './admin';

const router: Router = Router();

router.use('/auth', adminRoute);

router.get('/lib/videos', auth.middleware, VideoLibraryController.index);
router.post('/lib/videos', auth.middleware, VideoLibraryController.upload);

router.get('/lib/clips', auth.middleware, ClipLibraryController.index);

router.get('/lib/effects', auth.middleware, FXLibraryController.index);


export default router;