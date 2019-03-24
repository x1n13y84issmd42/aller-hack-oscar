require('app-module-path/register');
require('tsconfig-paths/register');

import * as express from 'express';
import * as debug from 'debug';
import args from 'fw/args';
import {boot} from 'boot';

const log = debug('main');
const app = express();

process.on('unhandledRejection', (reason, p) => {
	log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

if (args[0]) {
	boot.boot(args[0], app);
} else {
	log(`No boot sequence name was provided. The following sequences are available:`, boot.listSequences());
}
