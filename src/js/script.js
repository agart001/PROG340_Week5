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

const textureLoader = new THREE.TextureLoader();
const cubeLoader = new THREE.CubeTextureLoader();

var stars_img = document.getElementById('stars').src;

scene.background = cubeLoader.load([stars_img, stars_img, stars_img, stars_img, stars_img, stars_img]);

var sun_img_el = document.getElementById('sun').src;

var mer_img_el = document.getElementById('mercury').src;
var ven_img_el = document.getElementById('venus').src;
var ear_img_el = document.getElementById('earth').src;

var moo_img_el = document.getElementById('moon').src;

var mar_img_el = document.getElementById('mars').src;
var jup_img_el = document.getElementById('jupiter').src;
var sat_img_el = document.getElementById('saturn').src;

var sat_ring_img_el = document.getElementById('satring').src;

var ura_img_el = document.getElementById('uranus').src;
var nep_img_el = document.getElementById('neptune').src;


var sun_img = textureLoader.load(sun_img_el);

var mer_img = textureLoader.load(mer_img_el);
var ven_img = textureLoader.load(ven_img_el);
var ear_img = textureLoader.load(ear_img_el);

var moo_img = textureLoader.load(moo_img_el);

var mar_img = textureLoader.load(mar_img_el);
var jup_img = textureLoader.load(jup_img_el);
var sat_img = textureLoader.load(sat_img_el);

var sat_ring_img = textureLoader.load(sat_ring_img_el);

var ura_img = textureLoader.load(ura_img_el);
var nep_img = textureLoader.load(nep_img_el);

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
plane.fog = true;
scene.add(plane);


const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

const sun_shader = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
    },
    fragmentShader: document.getElementById('sunShader').textContent
});

const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sun_img, emissive: 0xffd700 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add a wavy effect to the sun
const waveShader = new THREE.ShaderMaterial({
    uniforms: {
        time: { type: "f", value: 1.0 },
    },
    vertexShader: `
        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform float time;
        void main() {
            float displacement = sin(position.x * 10.0 + time) * 0.1;
            vec3 newPosition = position + vec3(displacement, 0.0, 0.0);
            gl_FragColor = vec4(newPosition, 1.0);
        }
    `
});

sun.material = waveShader;

const mercury_geo = new THREE.SphereGeometry(.1, 32, 32);
const mercury_mat = new THREE.MeshStandardMaterial({ map: mer_img});
const mercury = new THREE.Mesh(mercury_geo, mercury_mat);
mercury.position.set(sun.position.x + 12, 10, 0);
mercury.castShadow = true;
mercury.fog = true;

const mercuryOrbit = new THREE.Object3D();
mercuryOrbit.add(mercury);
scene.add(mercuryOrbit);

const venus_geo = new THREE.SphereGeometry(.9, 32, 32);
const venus_mat = new THREE.MeshStandardMaterial({ map: ven_img });
const venus = new THREE.Mesh(venus_geo, venus_mat);
venus.position.set(sun.position.x + 17, 10, 0);
venus.castShadow = true;
venus.fog = true;

const venusOrbit = new THREE.Object3D();
venusOrbit.add(venus);
scene.add(venusOrbit);

const earth_geo = new THREE.SphereGeometry(1, 32, 32);
const earth_mat = new THREE.MeshStandardMaterial({ map: ear_img });
const earth = new THREE.Mesh(earth_geo, earth_mat);
earth.position.set(sun.position.x + 20, 10, 0);
earth.castShadow = true;
earth.fog = true;

const moon_geo = new THREE.SphereGeometry(0.2, 32, 32);
const moon_mat = new THREE.MeshStandardMaterial({ map: moo_img });
const moon = new THREE.Mesh(moon_geo, moon_mat);
moon.position.set(2, 0, 0);
moon.castShadow = true;
moon.fog = true;

const moonOrbit = new THREE.Object3D();
moonOrbit.add(moon);
moonOrbit.position.copy(earth.position);
scene.add(moonOrbit);

const earthOrbit = new THREE.Object3D();
earthOrbit.add(earth);
earthOrbit.add(moonOrbit);
scene.add(earthOrbit);


const mars_geo = new THREE.SphereGeometry(.8, 32, 32);
const mars_mat = new THREE.MeshStandardMaterial({ map: mar_img });
const mars = new THREE.Mesh(mars_geo, mars_mat);
mars.position.set(sun.position.x + 25, 10, 0);
mars.castShadow = true;
mars.fog = true;

const marsOrbit = new THREE.Object3D();
marsOrbit.add(mars);
scene.add(marsOrbit);

const jupiter_geo = new THREE.SphereGeometry(5, 32, 32);
const jupiter_mat = new THREE.MeshStandardMaterial({ map: jup_img });
const jupiter = new THREE.Mesh(jupiter_geo, jupiter_mat);
jupiter.position.set(sun.position.x + 50, 10, 0);
jupiter.castShadow = true;
jupiter.fog = true;

const jupiterOrbit = new THREE.Object3D();
jupiterOrbit.add(jupiter);
scene.add(jupiterOrbit);

const saturn_geo = new THREE.SphereGeometry(3, 32, 32);
const saturn_mat = new THREE.MeshStandardMaterial({ map: sat_img });
const saturn = new THREE.Mesh(saturn_geo, saturn_mat);
saturn.position.set(sun.position.x + 75, 10, 0);
saturn.castShadow = true;
saturn.fog = true;

const saturn_ring_geo = new THREE.PlaneGeometry(12, 12);
const saturn_ring_mat = new THREE.MeshStandardMaterial({ map: sat_ring_img, side: THREE.DoubleSide });
const saturn_ring = new THREE.Mesh(saturn_ring_geo, saturn_ring_mat);
saturn_ring.rotation.x = Math.PI / 2;
saturn_ring.position.set(saturn.position.x, saturn.position.y, saturn.position.z);

const saturnOrbit = new THREE.Object3D();
saturnOrbit.add(saturn);
saturnOrbit.add(saturn_ring);
scene.add(saturnOrbit);

const uranus_geo = new THREE.SphereGeometry(2, 32, 32);
const uranus_mat = new THREE.MeshStandardMaterial({ map: ura_img });
const uranus = new THREE.Mesh(uranus_geo, uranus_mat);
uranus.position.set(sun.position.x + 100, 10, 0);
uranus.castShadow = true;
uranus.fog = true;

const uranusOrbit = new THREE.Object3D();
uranusOrbit.add(uranus);
scene.add(uranusOrbit);

const neptune_geo = new THREE.SphereGeometry(2, 32, 32);
const neptune_mat = new THREE.MeshStandardMaterial({ map: nep_img});
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


    // Rotate the sun
    sun.rotation.x += 0.005;
    sun.rotation.y += 0.005;

    // Update the wavy effect
    waveShader.uniforms.time.value += 0.01;

    mercuryOrbit.rotateY(0.002);
    venusOrbit.rotateY(0.006);

    earthOrbit.rotateY(0.01);
    moonOrbit.rotation.y += 0.01;

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