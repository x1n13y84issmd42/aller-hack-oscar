import {TTransform} from 'fw/TTransform';
import {Readable, Writable, PassThrough} from 'stream';
import {RGB24Frame} from 'lib/ffmpeg';
import * as ffmpeg from 'fluent-ffmpeg';
import * as _ from 'underscore';
import { Buffer } from 'buffer';
import { FrameType } from 'fw/Frame';
import { FrameWrapper } from 'streams/FrameWrapper';
import { encode } from 'punycode';

export interface DecoderOptions {
	from?: number;
};

const DefaultDecoderOptions: DecoderOptions = {

};

interface CodecData {
	width: number;
	height: number;
	fps: number;
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
			cdata.fps = parseFloat(fps[0]);
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

export function decoder(input?: string | Readable, options?: DecoderOptions);
export function decoder(options?: DecoderOptions);
export function decoder(input?: any, options?: any) {

	options = _.extend({}, DefaultDecoderOptions, options);
	
	let ff = ffmpeg(input).format('image2pipe')
		.frames(180)
		.videoCodec('rawvideo')
		.addOption(['-pix_fmt', 'rgb24']);

	if (options.from) {
		ff.seekInput(options.from || '0:0:0');
	}

	let encoding: CodecData;
	let frameSize;

	ff.on('codecData', function(cdata) {
	//	console.log(cdata);

		encoding = parseCodecData(cdata);
		frameSize = encoding.width * encoding.height * 3;
		
		maker.configure({
			frameSize: frameSize,
			frameT: 1 / encoding.fps,
			width: encoding.width,
			height: encoding.height
		});
	});
	
	let maker = new FrameWrapper();

	ff.on('start', function(cmd) {
		console.log(`Decoder spawned: ${cmd}`);
		maker.emit('start', cmd);
	});

	ff.pipe(maker);

	return maker;
}
