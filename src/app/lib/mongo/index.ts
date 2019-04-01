import * as mongodb from 'mongodb';

export let videos: mongodb.Collection;

export function connect(uri: string) {
	return new Promise((resolve) => {
		mongodb.connect(uri, {useNewUrlParser: true}, (err, cli) => {
			videos = cli.db().collection('videos');
			resolve();
		});
	});
}
