import { Router } from 'express';

import VideoLibraryController from 'HTTP/controllers/VideoLibraryController';
import ClipLibraryController from 'HTTP/controllers/ClipLibraryController';
import FXLibraryController from 'HTTP/controllers/FXLibraryController';

import auth from 'lib/auth';

import adminRoute from './admin';
import facebookRoute from './facebook';

const router: Router = Router();

router.use('/auth', adminRoute);

router.get('/lib/videos', VideoLibraryController.index); //auth.middleware,
router.post('/lib/videos', VideoLibraryController.upload); //auth.middleware,
router.get('/lib/clips', ClipLibraryController.index); //auth.middleware,
router.get('/lib/effects', FXLibraryController.index); //auth.middleware,

router.use('/facebook', facebookRoute);


export default router;