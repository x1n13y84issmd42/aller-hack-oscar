import * as path from 'path';
import * as app from 'app';

import { Router, static as serveStatic, } from 'express';

const storageRoute: Router = Router();

storageRoute.use('/frames', serveStatic(path.join(app.root, 'storage/out/frames')));

export default storageRoute;
