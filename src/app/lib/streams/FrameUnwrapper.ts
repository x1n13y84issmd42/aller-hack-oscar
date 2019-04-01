import { TTransform } from "fw/TTransform";
import { Frame } from "fw/Frame";

export class FrameUnwrapper<FT extends Frame<Uint8Array>> extends TTransform<FT, Buffer> {
	_transform(frame: FT, encoding: string, callback: Function): void {
		this.log(`FrameUnwrapper unwrapping a ${frame.constructor.name} @ ${frame.vt}`);
		//TODO: Optimize Uint8Array-to-Buffer conversion
		this.push(new Buffer(frame.data), encoding);
		callback();
	}	
}
