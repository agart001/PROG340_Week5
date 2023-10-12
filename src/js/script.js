import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import * as DAT from "dat.gui";

var height = window.innerHeight;
var width = window.innerWidth;


const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load('../img/grid.jpg');

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const OrbControls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-10, 30, 30);
OrbControls.update();

const plane_geo = new THREE.PlaneGeometry(30, 30);
const plane_mat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
const plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

const tor_geo = new THREE.TorusGeometry(2, 1, 16, 64);
const tor_mat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torus = new THREE.Mesh(tor_geo, tor_mat);
torus.position.set(5, 5, 10);
torus.castShadow = true;
scene.add(torus);

const cyl_geo = new THREE.CylinderGeometry(3.75, .15, 5, 20);
const cyl_mat = new THREE.MeshStandardMaterial({ color: 0x0000FF });
const cyl = new THREE.Mesh(cyl_geo, cyl_mat);
cyl.position.set(-5,5,-5);
cyl.castShadow = true;
scene.add(cyl);

//gui
const gui = new DAT.GUI();
var guiOptions = {color: 0x0000FF};
gui.addColor(guiOptions, 'color').onChange(function (value) {
    box.material.color.setHex(value);
});

var guiOptions2 = {wireframe: true};
gui.add(guiOptions2, 'wireframe').onChange(function (value) {
    cyl.material.wireframe = value;
});


var angle = 0;
var guiOptions3 = {speed: 0.1};
gui.add(guiOptions3, 'speed',0 , 1);

//light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.scale.set(3, 2.5, 2);
directionalLight.position.set(-20, 20, 0);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);

const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

scene.add(cameraHelper);
scene.add(directionalLight);
scene.add(directionalLightHelper);
scene.add(ambientLight);


const gui_op_angle = {angle: 0.0};
const gui_op_pneumbra = {pneumbra: 0.0};
const gui_op_intensity = {intensity: 0.0};

gui.add(gui_op_angle, 'angle', 0.0, 1.0);
gui.add(gui_op_pneumbra, 'pneumbra', 0.0, 1.0);
gui.add(gui_op_intensity, 'intensity', 0.0, 1.0);




function animate(time) {
    directionalLight.angle = gui_op_angle.angle;
    directionalLight.pneumbra = gui_op_pneumbra.pneumbra;
    directionalLight.intensity = gui_op_intensity.intensity;
    directionalLightHelper.update();


    torus.rotation.x = time / 1000;
    torus.rotation.y = time / 1000;

    angle += guiOptions3.speed;
    cyl.position.x = Math.sin(angle) * 5;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);