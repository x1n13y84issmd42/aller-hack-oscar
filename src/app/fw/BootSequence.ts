import { Express } from 'express';
import * as app from 'app';

const log = app.log('bootseq');

export type SysBootstrapFn = () => Promise<any>;
export type SysBootstrapFactory = (app: Express) => SysBootstrapFn;

/**
 * Boot sequence essentially defines an app configuration by defining the set of susbystems that make the app.
 * By combining different subsytems in a sequence, you can get different flavors of the app: a web app,
 * various kinds of CLI apps, like background services, command processors, etc.
 */
export class BootSequence {
	constructor(private systems: SysBootstrapFactory[]) {}

	boot(app: Express) {
		let p = Promise
			.resolve()
			.catch(this.theCatch);

		for (let system of this.systems) {
			p = p.then(system(app));
		}

		return p;
	}

	theCatch(err) {
		log(err.message);
	}
}
