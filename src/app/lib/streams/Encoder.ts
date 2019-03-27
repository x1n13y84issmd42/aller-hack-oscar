
import * as stream from 'stream';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as FrameStream from 'fw/FrameStream';
import {TWritable} from 'fw/TWritable';
import {RGBA32Frame} from 'lib/ffmpeg';

export class Encoder extends TWritable<Buffer> {
	private ffmpeg: ffmpeg.FfmpegCommand;
	private src: stream.PassThrough;
	private ws: fs.WriteStream;

	constructor(private filename: string) {
		super();

		this.on('pipe', (src) => {
			console.log(`+ Piped ${src.constructor.name}`);
		});
		
		this.on('unpipe', (src) => {
			console.log(`- Unpiped ${src.constructor.name}`);
		});

		
		this.src = new stream.PassThrough({
			write: function(chunk: Buffer, enc: string, cb: Function) {
				console.log(`Encoder PT write ${chunk.length} bytes.`);
				this.push(chunk);
				cb();
			},

			highWaterMark: 1024 * 1024 * 10
		});
		
		this.src.on('cork', function () {
			console.log(`Encoder PT corked.`);
		});
		
		this.src.on('uncork', function () {
			console.log(`Encoder PT uncorked.`);
		});
		
		/*
		this.src.on('data', function (chunk: Buffer) {
			console.log(`Encoder PT data of ${chunk.length} bytes.`);
		});
		*/
	
	//	this.ws = fs.createWriteStream('pipe:0');
	//	this.src.pipe(this.ws);		
		this.src.cork();
	}

	configure(cfg) {
		super.configure(cfg);
		this.strapFFMpeg(this.src);
	}

	strapFFMpeg(src) {
		this.ffmpeg = ffmpeg(src)
			.inputOption([
				'-pix_fmt', 'rgba',
				'-vcodec', 'rawvideo',
				'-s', `${this.cfg.width}x${this.cfg.height}`,
			])
			.inputFps(1 / this.cfg.frameT)
			.inputFormat('rawvideo')
			.frames(10)
			.outputOption([
				'-pix_fmt', 'yuv420p'
			])
			.videoCodec('libx264')
			;

		this.ffmpeg.on('start', function(cmd) {
			console.log(`Encoder spawned ${cmd}`);
		});

		this.ffmpeg.on('progress', function(progress) {
			console.log(`Encoder is ${progress.percent}% done`);
		});

		this.ffmpeg.on('error', (err) => {
			console.log(`Encoder Error`, err);
		});

		this.ffmpeg.on('data', function(data) {
			console.log(`Encoder encodes`);
		});

		this.src.uncork();
		this.ffmpeg.save(this.filename);
	}

	write(frame: Buffer, encoding?, cb?: Function) {
		console.log('Encoder.write');
		let res = this.src.write(frame, encoding, cb);
	//	res = this.ws.write(frame, encoding, cb);
		return res;
	}
}

export function encoder(src, filename, cfg: FrameStream.Config) {
	let encoder = ffmpeg(src)
		.inputOption([
			'-pix_fmt', 'rgba',
			'-vcodec', 'rawvideo',
			'-s', `${cfg.width}x${cfg.height}`,
		])
		.inputFps(1 / cfg.frameT)
		.inputFormat('rawvideo')
	//	.frames(75)
		.outputOption([
			'-pix_fmt', 'yuv420p',

			/* '-b:v', '4M',
			'-minrate', '2M',
			'-maxrate', '6M',
			'-bufsize', '3M', */

			'-crf', '17'
		])
		.videoCodec('libx264')
		;

	encoder.on('start', function(cmd) {
		console.log(`Encoder spawned ${cmd}`);
	});

	encoder.on('progress', function(progress) {
		console.log(`Encoder is ${progress.percent}% done`);
	});

	encoder.on('error', (err) => {
		console.log(`Encoder Error`, err);
	});

	encoder.on('data', function(data) {
		console.log(`Encoder encodes`);
	});

	encoder.save(filename);
}
