import { Router } from 'express';

import * as bodyParser from 'body-parser';
import * as fileupload from 'express-fileupload';

import VideoLibraryController from 'HTTP/controllers/VideoLibraryController';

import auth from 'lib/auth';

const uploaderRouter: Router = Router();

uploaderRouter.use(bodyParser.json({
	inflate: true,
	limit: '512kb',
	strict: true,
}));

uploaderRouter.use(fileupload({ createParentPath: true }));

// uploaderRouter.use(auth.middleware);

uploaderRouter.post('/video', VideoLibraryController.upload);

export default uploaderRouter;
