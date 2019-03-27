import * as bodyParser from 'body-parser';
import * as fileupload from 'express-fileupload';

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
router.get('/lib/clips', ClipLibraryController.index); //auth.middleware,
router.get('/lib/effects', FXLibraryController.index); //auth.middleware,

router.use('/facebook', facebookRoute);
router.use(bodyParser.json({
	inflate: true,
	limit: '512kb',
	strict: true,
}));


const uplRouter: Router = Router();
uplRouter.use(fileupload({createParentPath: true}));
uplRouter.post('/video', VideoLibraryController.upload);
router.use('/upload', uplRouter);

export default router;
