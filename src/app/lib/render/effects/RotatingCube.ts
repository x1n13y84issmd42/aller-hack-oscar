import * as Types from 'lib/render/Types';
import * as THREE from 'three.js-node';
import { Effect } from 'lib/render/effects/Effect';
import { RGB24Frame } from 'lib/ffmpeg';


export class RotatingCube implements Effect<RGB24Frame> {

  private three;
  private scene;
  private camera;

  private material;
  private box;

  constructor() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    let boxDim = 270;
    this.box = new THREE.Mesh(new THREE.BoxGeometry(boxDim, boxDim, boxDim), this.material);
    this.box.position.x = -15;
    this.box.position.y = 0;
    this.box.position.z = -20;
    this.box.rotation.x = 0.1;
    this.box.rotation.y = 0.3;
    this.box.rotation.z = 0;
  }

  setContext(
    three: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.OrthographicCamera
  ) {
    this.three = three;
    this.scene = new THREE.Scene();
    this.camera = camera;
    this.scene.add(this.box);
  }

  processFrame(
    frame: RGB24Frame,
    settings: Types.EffectSetting[]
  ):
    RGB24Frame
  {
    this.material.map = frame.data;
    this.box.rotation.z = frame.t * 0.5;
    this.three.render(this.scene, this.camera);

    return null;
  }
}
