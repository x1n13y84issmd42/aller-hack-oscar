import { Router } from 'express';
import VideoLibraryController from 'HTTP/controllers/VideoLibraryController';
import ClipLibraryController from 'HTTP/controllers/ClipLibraryController';
import FXLibraryController from 'HTTP/controllers/FXLibraryController';

import adminRoute from './admin';

const router: Router = Router();

router.use('/auth', adminRoute);

router.get('/lib/videos', VideoLibraryController.index);
router.post('/lib/videos', VideoLibraryController.upload);

router.get('/lib/clips', ClipLibraryController.index);

router.get('/lib/effects', FXLibraryController.index);


export default router;