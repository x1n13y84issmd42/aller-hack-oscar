import * as bodyParser from 'body-parser';
import * as fileupload from 'express-fileupload';

import { Router } from 'express';
import VideoLibraryController from 'HTTP/controllers/VideoLibraryController';
import ClipLibraryController from 'HTTP/controllers/ClipLibraryController';
import FXLibraryController from 'HTTP/controllers/FXLibraryController';

const router: Router = Router();

router.use(bodyParser.json({
	inflate: true,
	limit: '512kb',
	strict: true,
}));

router.get('/lib/videos', VideoLibraryController.index);
router.get('/lib/clips', ClipLibraryController.index);
router.get('/lib/effects', FXLibraryController.index);

const uplRouter: Router = Router();
uplRouter.use(fileupload({createParentPath: true}));
uplRouter.post('/video', VideoLibraryController.upload);
router.use('/upload', uplRouter)

export default router;
