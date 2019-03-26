import { Router } from 'express';

import AuthController from 'HTTP/controllers/AuthController';

import auth from 'lib/auth';

let router: Router = Router();

router.get('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/me', AuthController.me);
router.get('/confirm', AuthController.confirm);

export default router;
