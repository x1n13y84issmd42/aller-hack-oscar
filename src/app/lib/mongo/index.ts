import * as mongodb from 'mongodb';

export let db: mongodb.Db;

export function connect(uri: string) {
	mongodb.connect(uri)
		.then((clnt) => {
			db = clnt.db();
		});
}
