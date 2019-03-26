import { Router } from 'express';
import * as fileUpload from 'express-fileupload';

import FacebookController from 'HTTP/controllers/FacebookController';

import auth from 'lib/auth';

let router: Router = Router();

router.use(fileUpload());

router.use(auth.middleware);

router.post('/video/upload', FacebookController.uploadVideo);

export default router;

