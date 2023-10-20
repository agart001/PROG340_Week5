import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import * as DAT from "dat.gui";

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const duckUrl = new URL('../assets/Duck.gltf', import.meta.url);
const assetLoader = new GLTFLoader();
assetLoader.load(
    duckUrl.href,
    function(gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0);
    },
    undefined,
    function(error) {
        console.error(error);
    }
);

var height = window.innerHeight;
var width = window.innerWidth;


const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

const scene = new THREE.Scene();

const cubeLoader = new THREE.CubeTextureLoader();
var grid_img = document.getElementById('grid').src;
var top_img = document.getElementById('top').src;
var bottom_img = document.getElementById('bottom').src;
scene.background = cubeLoader.load([grid_img, grid_img, top_img, bottom_img, grid_img, grid_img]);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const OrbControls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-10, 30, 30);
OrbControls.update();

//shaders

const shaderMat = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});


const plane_geo = new THREE.PlaneGeometry(30, 30);
const plane_mat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
const plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
plane.fog = true;
scene.add(plane);


const plane2 = new THREE.Mesh(plane_geo, plane_mat);
plane2.receiveShadow = true;
plane2.fog = true;
//scene.add(plane2);

function AnimPlane()
{
    plane2.geometry.attributes.position.array[0] -= 5 * Math.random();
    plane2.geometry.attributes.position.array[1] -= 5 * Math.random();
    plane2.geometry.attributes.position.array[2] -= 5 * Math.random();

    var lastZpos = plane2.geometry.attributes.position.array.length - 1;
    plane2.geometry.attributes.position.array[lastZpos] += 10 * Math.random();

    plane2.geometry.attributes.position.needsUpdate = true;
}

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

/*
const tor_geo = new THREE.TorusGeometry(2, 1, 16, 64);
const tor_mat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torus = new THREE.Mesh(tor_geo, shaderMat);
torus.position.set(5, 5, 10);
torus.castShadow = true;
torus.fog = true;
scene.add(torus);

const cyl_geo = new THREE.CylinderGeometry(3.75, .15, 5, 20);
const cyl_mat = new THREE.MeshStandardMaterial({ color: 0x0000FF });
const cyl = new THREE.Mesh(cyl_geo, cyl_mat);
cyl.position.set(-5,5,-5);
cyl.castShadow = true;
cyl.fog = true;
scene.add(cyl);
*/

const sun_geo = new THREE.SphereGeometry(10, 32, 32);
const sun_mat = new THREE.MeshStandardMaterial({ color: 0xFFFF00 });
const sun = new THREE.Mesh(sun_geo, sun_mat);
sun.position.set(0, 10, 0);
sun.castShadow = true;
sun.fog = true;
scene.add(sun);

const mercury_geo = new THREE.SphereGeometry(.1, 32, 32);
const mercury_mat = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
const mercury = new THREE.Mesh(mercury_geo, mercury_mat);
mercury.position.set(sun.position.x + 12, 10, 0);
mercury.castShadow = true;
mercury.fog = true;

const mercuryOrbit = new THREE.Object3D();
mercuryOrbit.add(mercury);
scene.add(mercuryOrbit);

const venus_geo = new THREE.SphereGeometry(.9, 32, 32);
const venus_mat = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
const venus = new THREE.Mesh(venus_geo, venus_mat);
venus.position.set(sun.position.x + 17, 10, 0);
venus.castShadow = true;
venus.fog = true;

const venusOrbit = new THREE.Object3D();
venusOrbit.add(venus);
scene.add(venusOrbit);

const earth_geo = new THREE.SphereGeometry(1, 32, 32);
const earth_mat = new THREE.MeshStandardMaterial({ color: 0x0000FF });
const earth = new THREE.Mesh(earth_geo, earth_mat);
earth.position.set(sun.position.x + 20, 10, 0);
earth.castShadow = true;
earth.fog = true;

const earthOrbit = new THREE.Object3D();
earthOrbit.add(earth);
scene.add(earthOrbit);


const mars_geo = new THREE.SphereGeometry(.8, 32, 32);
const mars_mat = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
const mars = new THREE.Mesh(mars_geo, mars_mat);
mars.position.set(sun.position.x + 25, 10, 0);
mars.castShadow = true;
mars.fog = true;

const marsOrbit = new THREE.Object3D();
marsOrbit.add(mars);
scene.add(marsOrbit);

const jupiter_geo = new THREE.SphereGeometry(5, 32, 32);
const jupiter_mat = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
const jupiter = new THREE.Mesh(jupiter_geo, jupiter_mat);
jupiter.position.set(sun.position.x + 50, 10, 0);
jupiter.castShadow = true;
jupiter.fog = true;

const jupiterOrbit = new THREE.Object3D();
jupiterOrbit.add(jupiter);
scene.add(jupiterOrbit);

const saturn_geo = new THREE.SphereGeometry(3, 32, 32);
const saturn_mat = new THREE.MeshStandardMaterial({ color: 0xFFFF00 });
const saturn = new THREE.Mesh(saturn_geo, saturn_mat);
saturn.position.set(sun.position.x + 75, 10, 0);
saturn.castShadow = true;
saturn.fog = true;

const saturnOrbit = new THREE.Object3D();
saturnOrbit.add(saturn);
scene.add(saturnOrbit);

const uranus_geo = new THREE.SphereGeometry(2, 32, 32);
const uranus_mat = new THREE.MeshStandardMaterial({ color: 0x0000FF });
const uranus = new THREE.Mesh(uranus_geo, uranus_mat);
uranus.position.set(sun.position.x + 100, 10, 0);
uranus.castShadow = true;
uranus.fog = true;

const uranusOrbit = new THREE.Object3D();
uranusOrbit.add(uranus);
scene.add(uranusOrbit);

const neptune_geo = new THREE.SphereGeometry(2, 32, 32);
const neptune_mat = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
const neptune = new THREE.Mesh(neptune_geo, neptune_mat);
neptune.position.set(sun.position.x + 125, 10, 0);
neptune.castShadow = true;
neptune.fog = true;

const neptuneOrbit = new THREE.Object3D();
neptuneOrbit.add(neptune);
scene.add(neptuneOrbit);

//gui
const gui = new DAT.GUI();

/*
var guiOptions = {color: 0x0000FF};
gui.addColor(guiOptions, 'color').onChange(function (value) {
    torus.material.color.setHex(value);
});


var guiOptions2 = {wireframe: true};
gui.add(guiOptions2, 'wireframe').onChange(function (value) {
    cyl.material.wireframe = value;
});


var angle = 0;
var guiOptions3 = {speed: 0.1};
gui.add(guiOptions3, 'speed',0 , 1);
*/

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

//fog
const fog = new THREE.Fog(0xFFC0CB, 10, 100);
//scene.fog = fog;


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

    //AnimPlane();

    sun.rotateY(0.1);
    mercuryOrbit.rotateY(0.002);
    venusOrbit.rotateY(0.006);
    earthOrbit.rotateY(0.01);
    marsOrbit.rotateY(0.008);
    jupiterOrbit.rotateY(0.0022);
    saturnOrbit.rotateY(0.0011);
    uranusOrbit.rotateY(0.00022);
    neptuneOrbit.rotateY(0.00011);


    /*
    torus.rotation.x = time / 1000;
    torus.rotation.y = time / 1000;

    angle += guiOptions3.speed;
    cyl.position.x = Math.sin(angle) * 5;
    */

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);