import { Router } from 'express';

import libRoute from './lib';
import adminRoute from './admin';
import facebookRoute from './facebook';
import uploaderRoute from './uploader';

const router: Router = Router();

router.use('/auth', adminRoute);
router.use('/lib', libRoute);

router.use('/facebook', facebookRoute);
router.use('/upload', uploaderRoute);

export default router;
