import {TTransform} from 'fw/TTransform';

export class JSONEncoder extends TTransform<any, Buffer> {
	constructor() {
		super({
			objectMode: true,
			readableObjectMode: true,
			writableObjectMode: false,
			highWaterMark: 1024 * 1024 * 10
		});
	}

	_transform(chunk: any, encoding, callback) {
		this.push(new Buffer(JSON.stringify(chunk) + '\n'));
		callback();
	}
}
