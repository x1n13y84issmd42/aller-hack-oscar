import { Router } from 'express';
import Home from 'HTTP/controllers/Home';
import apiRouter from 'HTTP/router/api';
import staticRouter from 'HTTP/router/static';

let router: Router = Router();

router.use('/static', staticRouter);

router.use('/api', apiRouter);

router.get('/', Home.index);
router.get('/', Home.dashboard);

export default router;
