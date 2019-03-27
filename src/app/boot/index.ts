import { BootManager } from "fw/BootManager";
import { BootSequence } from "fw/BootSequence";
import Env from 'system/Env';
import HTTP from 'system/HTTP';
import HTTPS from 'system/HTTPS';
import Router from 'system/Router';
import Session from 'system/Session';
import MongoDB from 'system/MongoDB';
import Bye from 'system/Bye';
import Auth from "system/Auth";
import * as app from 'app';

import Hello from 'system/cli/Hello';
import RenderTest from "system/cli/RenderTest";

const bootMgr = new BootManager();

bootMgr.define('web', new BootSequence([
	Env,
	Auth,
	Session,
	MongoDB,
	HTTP,
	HTTPS,
	Router,
]));

bootMgr.define('cli', new BootSequence([
	Env,
	MongoDB,
	Hello,
	Bye,
]));

bootMgr.define('rt', new BootSequence([
	Env,
	MongoDB,
	RenderTest,
//	Bye,
]));

export const boot = bootMgr;
