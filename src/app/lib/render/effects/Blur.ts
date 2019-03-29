import * as Types from 'lib/render/Types';
import * as THREE from 'three.js-node';
import { Effect } from 'lib/render/effects/Effect';
import { RGB24Frame } from 'lib/ffmpeg';
import * as ndarray from 'ndarray';


export class Blur implements Effect<RGB24Frame> {

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
    frame = this.blure(frame, settings);

    this.box = new THREE.Mesh(new THREE.PlaneGeometry(frame.width, frame.height), this.material);
    this.box.rotation.z = Math.PI;
    this.box.rotation.y = Math.PI;
    this.scene.add(this.box);
    this.material.map = frame.data;
    this.three.render(this.scene, this.camera);

    return null;
  }

  private blure(frame: RGB24Frame, settings: Types.EffectSetting[]): RGB24Frame {
    let original = new ndarray(frame.data['image'].data, [frame.height, frame.width, 3]);
    let boxSize;

    for (let setting of settings) {
      boxSize = setting['size'];
    }

    if (!boxSize) {
      boxSize = 3;
      // throw '"size" setting is not provided';
    }

    let result = new ndarray(frame.data['image'].data, [frame.height, frame.width, 3]);

    for(var i = boxSize; i < original.shape[0] - boxSize; ++i) {
      for(var j = boxSize; j < original.shape[1] - boxSize; ++j) {
        let resultPixel = [0, 0, 0];

        for (let k = (boxSize * -1); k < boxSize + 1; ++k) {
          for (let l = (boxSize * -1); l < boxSize + 1; ++l) {
            resultPixel[0] += original.get(i + k, j + l, 0) / Math.pow((boxSize * 2 + 1), 2);
            resultPixel[1] += original.get(i + k, j + l, 1) / Math.pow((boxSize * 2 + 1), 2);
            resultPixel[2] += original.get(i + k, j + l, 2) / Math.pow((boxSize * 2 + 1), 2);
          }
        }

        result.set(i, j, 0, resultPixel[0]);
        result.set(i, j, 1, resultPixel[1]);
        result.set(i, j, 2, resultPixel[2]);
      }
    }

    frame.data['image'].data = result.data;
    return frame;
  }
}
