import {TTransform} from 'fw/streams';
import {Frame} from 'fw/Frame';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export class Files<FT extends Frame<Buffer>> extends TTransform<FT, void> {
	private c = 0;

	constructor(private dirname: string, private ext: string) {
		super();

		let dirName = `storage/out/${this.dirname}`;

		if (! fs.existsSync(dirName)) {
			mkdirp.sync(dirName);
		}
	}
	
	_transform(frame: FT, encoding: string, callback: Function): void {
		let path = `storage/out/${this.dirname}/${this.c++}.${this.ext}`;
		this.log(`${frame.t.toFixed(2)} => ${path}`);

		fs.writeFileSync(path, frame.data);

		callback();
	}
}
