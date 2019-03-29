import * as Types from 'lib/render/Types';
import * as THREE from 'three.js-node';
import { Effect } from 'lib/render/effects/Effect';
import { RGB24Frame } from 'lib/ffmpeg';
import * as ndarray from 'ndarray';


export class BlackWhite implements Effect<RGB24Frame> {

  private three;
  private scene;
  private camera;

  private material;
  private box;

  constructor() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
  }

  setContext(
    three: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.OrthographicCamera
  ) {
    this.three = three;
    this.scene = new THREE.Scene();
    this.camera = camera;
  }

  processFrame(
    frame: RGB24Frame,
    settings: Types.EffectSetting[]
  ):
    RGB24Frame
  {
    frame = this.convertToBW(frame);

    this.box = new THREE.Mesh(new THREE.PlaneGeometry(frame.width, frame.height), this.material);
    this.box.rotation.z = Math.PI;
    this.box.rotation.y = Math.PI;
    this.scene.add(this.box);
    this.material.map = frame.data;
    this.three.render(this.scene, this.camera);

    return null;
  }

  private convertToBW(frame: RGB24Frame): RGB24Frame {
    let xpixels = new ndarray(frame.data['image'].data, [frame.height, frame.width, 3]);

    for(var i = 0; i < xpixels.shape[0]; ++i) {
      for(var j = 0; j < xpixels.shape[1]; ++j) {
        let R = xpixels.get(i, j, 0);
        let G = xpixels.get(i, j, 1);
        let B = xpixels.get(i, j, 2);

        let targetValue = ( (0.3 * R) + (0.59 * G) + (0.11 * B) )

        xpixels.set(i, j, 0, targetValue);
        xpixels.set(i, j, 1, targetValue);
        xpixels.set(i, j, 2, targetValue);
      }
    }

    frame.data['image'].data = xpixels.data;
    return frame;
  }
}
