import {TTransform} from 'fw/TTransform';
import {Readable, Writable, PassThrough} from 'stream';
import {RGB24Frame} from 'lib/ffmpeg';
import * as ffmpeg from 'fluent-ffmpeg';
import * as _ from 'underscore';
import { Buffer } from 'buffer';
import { FrameType } from 'fw/Frame';
import { FrameWrapper } from 'streams/FrameWrapper';
import { encode } from 'punycode';
import * as debug from 'debug';
import { Sink } from 'streams/Sink';

const log = debug(`decoder`);

export interface DecoderOptions {
	from?: number;
	frames?: number;
};

const DefaultDecoderOptions: DecoderOptions = {

};

interface CodecData {
	width: number;
	height: number;
	FPS: number;
}

let CodecDataParsers = [
	{
		rx: /\d+x\d+/,
		parse: (v: string, cdata: CodecData) => {
			let wh = v.split('x');
			let w = ~~wh[0];
			let h = ~~wh[1];

			if (wh[0] && wh[1]) {
				cdata.width = w;
				cdata.height = h;
			}
		}
	},
	{
		rx: /\d+(\.\d+)? fps/,
		parse: (v: string, cdata: CodecData) => {
			let fps = v.split(' ');
			cdata.FPS = parseFloat(fps[0]);
		}
	}
];

function parseCodecData(cdata:any): CodecData {

	let res: any = {
	};

	if (cdata.video_details) {
		for (let vd in cdata.video_details) {

			let d = cdata.video_details[vd];
			
			for (let cdpI in CodecDataParsers) {
				let parser = CodecDataParsers[cdpI];
				let m = d.match(parser.rx);

				if (m) {
					parser.parse(m[0], res);
					break;
				}
			}
		}
	}

	return res;
}

export function decoder(input?: string | Readable, options?: DecoderOptions): FrameWrapper;
export function decoder(options?: DecoderOptions): FrameWrapper;
export function decoder(input?: any, options?: any): FrameWrapper {

	options = _.extend({}, DefaultDecoderOptions, options);
	let frames
	
	let ff = ffmpeg(input).format('image2pipe');

	if (options.frames) {
		log(`frames`, options.frames);
		ff = ff.frames(options.frames);
	}
	
	ff.videoCodec('rawvideo')
		.addOption(['-pix_fmt', 'rgb24']);

	if (options.from) {
		log(`seekInput`, options.from);
		ff.seekInput(options.from || '0:0:0');
	}

	let encoding: CodecData;
	let frameSize;

	ff.on('codecData', function(cdata) {
		log(cdata);

		encoding = parseCodecData(cdata);
		frameSize = encoding.width * encoding.height * 3;
		
		maker.configure({
			frameSize: frameSize,
			frameT: 1 / encoding.FPS,
			width: encoding.width,
			height: encoding.height
		});
	});
	
	let maker = new FrameWrapper();

	ff.on('start', function(cmd) {
		log(`Decoder spawned: ${cmd}`);
		maker.emit('start', cmd);
	});

	log('ffmpeg piped to the maker')
	ff.pipe(maker);

	return maker;
}


export function metaDecoder(input?: string | Readable, options?: DecoderOptions): Promise<CodecData> {
	return new Promise<CodecData>((resolve) => {
		let ff = ffmpeg(input).format('image2pipe');
	
		ff.on('codecData', function(cdata) {
			resolve(parseCodecData(cdata));
		});

		ff.on('start', function(cmd) {
			log(`Decoder spawned: ${cmd}`);
		});

		ff.pipe(new Sink());
	});
}
