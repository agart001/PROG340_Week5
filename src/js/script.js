import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import * as DAT from "dat.gui";

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

//star source : https://www.cgtrader.com/items/829076/download-page
const starUrl = new URL('../assets/star.glb', import.meta.url).href;
const glbLoader = new GLTFLoader();
glbLoader.load(starUrl, (gltf) => {
    const star = gltf.scene;
    scene.add(star);
    star.position.set(0, 50, 0);
    star.scale.set(0.5, 0.5, 0.5);
});

var height = window.innerHeight;
var width = window.innerWidth;


const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const cubeLoader = new THREE.CubeTextureLoader();

var stars_img = document.getElementById('stars').src;
scene.background = cubeLoader.load([stars_img, stars_img, stars_img, stars_img, stars_img, stars_img]);

var sun_img_el = document.getElementById('sun').src;
var sunnorm_img_el = document.getElementById('sunnorm').src;

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
var sunnorm_img = textureLoader.load(sunnorm_img_el);

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

const OrbControls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 350, 0);
OrbControls.update();

const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const glowGeometry = new THREE.SphereGeometry(10.15, 32, 32);

const sunSurfaceMaterial = new THREE.MeshStandardMaterial({
    map: sun_img,
    normalMap: sunnorm_img,
  });

const sunMaterial = new THREE.MeshStandardMaterial({
  map: sun_img,
  normalMap: sunnorm_img,
  emissive: 0xFFFFFF, // Set the emissive color to your desired color
  emissiveIntensity: .50, // Adjust the intensity as needed
});

const sunGlow = new THREE.Mesh(glowGeometry, sunMaterial);
const sun = new THREE.Mesh(sunGeometry, sunSurfaceMaterial);
sun.position.set(0, 10, 0);
sunGlow.position.set(0, 10, 0);
sunGlow.material.transparent = true;
sunGlow.material.castShadow = true;
scene.add(sun);
scene.add(sunGlow);

const mercury_geo = new THREE.SphereGeometry(.1, 32, 32);
const mercury_mat = new THREE.MeshStandardMaterial({ map: mer_img});
const mercury = new THREE.Mesh(mercury_geo, mercury_mat);
mercury.position.set(sun.position.x + 12, 10, 0);
mercury.receiveShadow = true;
mercury.castShadow = true;
mercury.fog = true;

const mercuryOrbit = new THREE.Object3D();
mercuryOrbit.add(mercury);
scene.add(mercuryOrbit);

const venus_geo = new THREE.SphereGeometry(.9, 32, 32);
const venus_mat = new THREE.MeshStandardMaterial({ map: ven_img });
const venus = new THREE.Mesh(venus_geo, venus_mat);
venus.position.set(sun.position.x + 17, 10, 0);
venus.receiveShadow = true;
venus.castShadow = true;
venus.fog = true;

const venusOrbit = new THREE.Object3D();
venusOrbit.add(venus);
scene.add(venusOrbit);

const earth_geo = new THREE.SphereGeometry(1, 32, 32);
const earth_mat = new THREE.MeshStandardMaterial({ map: ear_img });
const earth = new THREE.Mesh(earth_geo, earth_mat);
earth.position.set(sun.position.x + 30, 10, 0);
earth.receiveShadow = true;
earth.castShadow = true;
earth.fog = true;

const moon_geo = new THREE.SphereGeometry(0.2, 32, 32);
const moon_mat = new THREE.MeshStandardMaterial({ map: moo_img });
const moon = new THREE.Mesh(moon_geo, moon_mat);
moon.position.set(2, 0, 0);
moon.receiveShadow = true;
moon.castShadow = true;
moon.fog = true;

const moonLight = new THREE.PointLight(0xffffff, 0.5, 1000);
moonLight.position.set(2, 0, 0);
moonLight.castShadow = true;
scene.add(moonLight);
moonLight.add(moon);

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
mars.position.set(sun.position.x + 40, 10, 0);
mars.receiveShadow = true;
mars.castShadow = true;
mars.fog = true;

const marsOrbit = new THREE.Object3D();
marsOrbit.add(mars);
scene.add(marsOrbit);

const jupiter_geo = new THREE.SphereGeometry(5, 32, 32);
const jupiter_mat = new THREE.MeshStandardMaterial({ map: jup_img });
const jupiter = new THREE.Mesh(jupiter_geo, jupiter_mat);
jupiter.position.set(sun.position.x + 100, 10, 0);
jupiter.receiveShadow = true;
jupiter.castShadow = true;
jupiter.fog = true;

const jupiterOrbit = new THREE.Object3D();
jupiterOrbit.add(jupiter);
scene.add(jupiterOrbit);

const saturn_geo = new THREE.SphereGeometry(3, 32, 32);
const saturn_mat = new THREE.MeshStandardMaterial({ map: sat_img });
const saturn = new THREE.Mesh(saturn_geo, saturn_mat);
saturn.position.set(sun.position.x + 150, 10, 0);
saturn.receiveShadow = true;
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
uranus.position.set(sun.position.x + 200, 10, 0);
uranus.receiveShadow = true;
uranus.castShadow = true;
uranus.fog = true;

const uranusOrbit = new THREE.Object3D();
uranusOrbit.add(uranus);
scene.add(uranusOrbit);

const neptune_geo = new THREE.SphereGeometry(2, 32, 32);
const neptune_mat = new THREE.MeshStandardMaterial({ map: nep_img});
const neptune = new THREE.Mesh(neptune_geo, neptune_mat);
neptune.position.set(sun.position.x + 250, 10, 0);
neptune.receiveShadow = true;
neptune.castShadow = true;
neptune.fog = true;

const neptuneOrbit = new THREE.Object3D();
neptuneOrbit.add(neptune);
scene.add(neptuneOrbit);

//gui
const gui = new DAT.GUI();


//light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, .25);
scene.add(ambientLight);

function animate(time) {

    sun.rotation.y += 0.005;
    sunMaterial.displacementScale = 0.1 * Math.sin(time * 0.1);
    sunMaterial.displacementBias = 0.1 * Math.cos(time * 0.1);

    mercuryOrbit.rotateY(0.002);

    venusOrbit.rotateY(0.006);
    venus.rotation.y += 0.001;

    earthOrbit.rotateY(0.01);
    earth.rotation.y += 0.002;
    moonOrbit.rotation.y += 0.01;

    marsOrbit.rotateY(0.008);
    mars.rotation.y += 0.002;

    jupiterOrbit.rotateY(0.0022);
    jupiter.rotation.y += 0.003;

    saturnOrbit.rotateY(0.0011);
    saturn.rotation.y += 0.001;

    uranusOrbit.rotateY(0.00022);
    uranus.rotation.x += 0.001;

    neptuneOrbit.rotateY(0.00011);
    neptune.rotation.x += 0.0015;


    /*
    torus.rotation.x = time / 1000;
    torus.rotation.y = time / 1000;

    angle += guiOptions3.speed;
    cyl.position.x = Math.sin(angle) * 5;
    */

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);