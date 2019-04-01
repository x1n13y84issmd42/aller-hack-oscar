import { Router } from 'express';

import libRoute from './lib';
import adminRoute from './admin';
import facebookRoute from './facebook';
import uploaderRoute from './uploader';
import renderRoute from './render';

const router: Router = Router();

router.use('/auth', adminRoute);
router.use('/lib', libRoute);

router.use('/facebook', facebookRoute);
router.use('/upload', uploaderRoute);

router.use('/render', renderRoute);

export default router;
