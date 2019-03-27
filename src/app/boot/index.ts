import { BootManager } from "fw/BootManager";
import { BootSequence } from "fw/BootSequence";
import Env from 'system/Env';
import HTTP from 'system/HTTP';
import HTTPS from 'system/HTTPS';
import Router from 'system/Router';
import Session from 'system/Session';
import MongoDB from 'system/MongoDB';
import Bye from 'system/Bye';
import * as app from 'app';

import Hello from 'system/cli/Hello';
import FrameRenderMachineTest from 'system/cli/FrameRenderMachineTest';
import FromDecoderStreamFrameExtractorTest
  from 'system/cli/FromDecoderStreamFrameExtractorTest';
import BlackWhiteEffectTest from 'system/cli/BlackWhiteEffectTest';
import FFTest from "system/cli/FFTest";
import MachineTest from "system/cli/MachineTest";

const bootMgr = new BootManager();

bootMgr.define('web', new BootSequence([
	Env,
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

bootMgr.define('ff', new BootSequence([
	Env,
	MongoDB,
	FFTest,
]));

bootMgr.define('rt', new BootSequence([
	Env,
	MongoDB,
	MachineTest,
]));

bootMgr.define('frame_render_machine_test', new BootSequence([
  Env,
  FrameRenderMachineTest,
  Bye,
]));

bootMgr.define('frame_extractor_test', new BootSequence([
  Env,
  FromDecoderStreamFrameExtractorTest,
  Bye,
]));

bootMgr.define('black_and_white_test', new BootSequence([
  Env,
  BlackWhiteEffectTest,
  Bye,
]));
export const boot = bootMgr;
