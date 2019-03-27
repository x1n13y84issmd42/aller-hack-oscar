import gl = require('gl');
import * as THREE from 'three.js-node';
import * as dom from 'jsdom-global';
import {Frame} from 'fw/Frame';

dom();

export class GLFrame extends Frame<THREE.DataTexture> {}
