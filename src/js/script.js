import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import * as DAT from "dat.gui";

var height = window.innerHeight;
var width = window.innerWidth;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

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

const box_geo = new THREE.BoxGeometry(1, 1, 1);
const box_mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(box_geo, box_mat);
scene.add(box);

const sphere_geo = new THREE.SphereGeometry(2, 60, 60);
const sphere_mat = new THREE.MeshStandardMaterial({ color: 0x0000FF, wireframe: true });
const sphere = new THREE.Mesh(sphere_geo, sphere_mat);
sphere.position.set(-10,50,0);
sphere.castShadow = true;
scene.add(sphere);

//gui
const gui = new DAT.GUI();
var guiOptions = {color: 0x0000FF};
gui.addColor(guiOptions, 'color').onChange(function (value) {
    box.material.color.setHex(value);
});

var guiOptions2 = {wireframe: true};
gui.add(guiOptions2, 'wireframe').onChange(function (value) {
    sphere.material.wireframe = value;
});


var angle = 0;
var guiOptions3 = {speed: 0.1};
gui.add(guiOptions3, 'speed',0 , 1);

//light
const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

const spotlight = new THREE.SpotLight(0xFFFFFF);
spotlight.castShadow = true;
spotlight.position.set(-20, 20, 0);

const spotlightHelper = new THREE.SpotLightHelper(spotlight);

scene.add(spotlight);
scene.add(spotlightHelper);


const gui_op_angle = {angle: 0};
const gui_op_pneumbra = {pneumbra: 0};
const gui_op_intensity = {intensity: 0};

gui.add(gui_op_angle, 'angle', 0, 1);
gui.add(gui_op_pneumbra, 'pneumbra', 0, 1);
gui.add(gui_op_intensity, 'intensity', 0, 1);


function animate(time) {
    spotlight.angle = gui_op_angle.angle;
    spotlight.pneumbra = gui_op_pneumbra.pneumbra;
    spotlight.intensity = gui_op_intensity.intensity;
    spotlightHelper.update();


    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    angle += guiOptions3.speed;
    sphere.position.y = Math.abs(Math.sin(angle)) * 10;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);