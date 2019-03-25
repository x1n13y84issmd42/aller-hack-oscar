import { BootManager } from "fw/BootManager";
import { BootSequence } from "fw/BootSequence";
import Env from 'system/Env';
import HTTP from 'system/HTTP';
import HTTPS from 'system/HTTPS';
import Router from 'system/Router';
import Session from 'system/Session';
import Bye from 'system/Bye';
import * as app from 'app';

import Hello from 'system/cli/Hello';

const bootMgr = new BootManager();

bootMgr.define('web', new BootSequence([
	Env,
	Session,
	HTTP,
	HTTPS,
	Router,
]));

bootMgr.define('cli', new BootSequence([
	Env,
	Hello,
	Bye,
]));

export const boot = bootMgr;
