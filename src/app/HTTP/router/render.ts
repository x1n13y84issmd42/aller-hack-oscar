import { Router } from 'express';
import RenderController from 'HTTP/controllers/RenderController';
import bodyParser = require('body-parser');

let router: Router = Router();

//router.use(auth.middleware);

router.use(bodyParser.json({
	inflate: true,
	limit: '512kb',
	strict: true,
}));

router.post('/preview', RenderController.preview);

export default router;

