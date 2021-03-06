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
import FFTest from "system/cli/FFTest";
import MachineTest from "system/cli/MachineTest";

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

bootMgr.define('sleep', new BootSequence([
	Env,
//	MongoDB,
	Hello,
	Bye,
]));

bootMgr.define('ff', new BootSequence([
	Env,
	MongoDB,
	FFTest,
]));

bootMgr.define('machine', new BootSequence([
	Env,
	MongoDB,
	MachineTest,
]));

export const boot = bootMgr;
