// script.js — version augmentée avec beaucoup de tableaux placés aléatoirement
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';

const container = document.getElementById('container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.scale.set(2, 2, 2);

const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 2000);
scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const dir = new THREE.DirectionalLight(0xffffff, 0.6);
dir.position.set(20, 30, 10);
scene.add(dir);

function onWindowResize() {
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight * 0.8;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onWindowResize);
onWindowResize();

// ---------- CONFIG
const PATH = [
  { x: 0, z: 0 }, { x: 25, z: 0 }, { x: 25, z: 15 }, { x: 10, z: 15 },
  { x: 10, z: 30 }, { x: 35, z: 30 }, { x: 35, z: 10 }, { x: 50, z: 10 },
  { x: 50, z: 25 }, { x: 15, z: 25 }, { x: 15, z: 40 }, { x: 55, z: 40 },
  { x: 55, z: 55 }, { x: 5, z: 55 }, { x: 5, z: 70 }, { x: 60, z: 70 }
];

const corridorWidth = 3.0;
const wallThickness = 0.3;
const wallHeight = 2.5;

const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const floorTex = new THREE.TextureLoader().load(
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/hardwood2_diffuse.jpg"
);
floorTex.wrapS = THREE.RepeatWrapping;
floorTex.wrapT = THREE.RepeatWrapping;
floorTex.repeat.set(4, 1);
floorTex.encoding = THREE.sRGBEncoding;

const floorMat = new THREE.MeshStandardMaterial({
  map: floorTex,
  color: 0xE0AC7A,
  metalness: 0.0,
  roughness: 0.35
});

function normalize(vx, vz) {
  const l = Math.hypot(vx, vz) || 1e-6;
  return { x: vx / l, z: vz / l };
}

function computeOffsets(path, halfOffset) {
  const left = [], right = [];
  for (let i = 0; i < path.length; i++) {
    const prev = i === 0 ? path[i] : path[i - 1];
    const next = i === path.length - 1 ? path[i] : path[i + 1];
    const t = normalize(next.x - prev.x, next.z - prev.z);
    const nx = -t.z, nz = t.x;
    left.push({ x: path[i].x + nx * halfOffset, z: path[i].z + nz * halfOffset });
    right.push({ x: path[i].x - nx * halfOffset, z: path[i].z - nz * halfOffset });
  }
  return { left, right };
}

function buildWallMesh(poly) {
  for (let i = 0; i < poly.length - 1; i++) {
    const a = poly[i], b = poly[i + 1];
    const dx = b.x - a.x, dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    const midX = (a.x + b.x) / 2, midZ = (a.z + b.z) / 2;
    const geo = new THREE.BoxGeometry(len, wallHeight, wallThickness);
    const mesh = new THREE.Mesh(geo, wallMat);
    mesh.position.set(midX, wallHeight / 2, midZ);
    mesh.rotation.y = Math.atan2(dz, dx);
    scene.add(mesh);
  }
}

function addPictureInsideWall(pointA, pointB, textureURL, maxHeight = 2.0, wallSide = 'left', shift = 0.5) {
    const dx = pointB.x - pointA.x;
    const dz = pointB.z - pointA.z;
    const len = Math.hypot(dx, dz);

    const dirX = dx / len;
    const dirZ = dz / len;

    let nx = -dirZ;
    let nz = dirX;

    if (wallSide === 'right') { nx *= -1; nz *= -1; }

    const offsetDistance = corridorWidth / 2 - 0.7;
    const offsetX = nx * offsetDistance;
    const offsetZ = nz * offsetDistance;

    const px = (pointA.x + pointB.x)/2 + offsetX + dirX * shift;
    const pz = (pointA.z + pointB.z)/2 + offsetZ + dirZ * shift;

    const height = Math.min(maxHeight, wallHeight - 0.05);
    const width = Math.min(len * 0.9, 3.0);

    const geo = new THREE.PlaneGeometry(width, height);
    const tex = new THREE.TextureLoader().load(textureURL);
    tex.encoding = THREE.sRGBEncoding;
    const mat = new THREE.MeshStandardMaterial({ map: tex });
    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(px, height/2 + 0.05, pz);
    mesh.rotation.y = Math.atan2(dz, dx);
    scene.add(mesh);
}

// ========== AJOUT MASSIF DE TABLEAUX ==========
const pictures = [
  "Sean Yoro.jpg.", 
  "« Le cœur des Andes » (1859), de Frederic Edwin Church.jpg", 
  "https://youtu.be/_1Vgeose43g", 
  "Bansky.jpg", 
  "Cambona-mer de nuages.jpg",
  "David-Cécile-Ollichon.jpg", 
  "Déchets.jpg", 
  "Ducrot-Gaspard-Vanessa-Meynet-Arcimboldo.jpg", 
  "ecce_homo-Poulain-Artwork-1-696x973.jpg", 
  "emeline-brial-desespere-Courbet.jpg",
  "Exposure-Antony Gormley.jpg",
  "Facebook-Conquest-Olivier-Ploux-1-1-696x995.jpg",
  "Hokusai.jpg",
  "Kevan-Le cri.jpg",
  "Le-grand-Jugement-Dernier-Campos-Julie-696x913.jpg",
  "lucas-baudot-la-menagere-la-laitiere-Vermeer.jpg",
  "Nuclear-pop-Art-Loprieno-Baptiste-Warhol.jpg",
  "Quinn.jpg",
  "sans-titre-charlotte-repesse-van Gogh.jpg",
  "stevan-dohanos-art-lover.jpg"
];


function addRandomPictures(count = 20) {
  for (let i = 0; i < count; i++) {
    const seg = Math.floor(Math.random() * (PATH.length - 1));
    const A = PATH[seg];
    const B = PATH[seg + 1];

    const tex = pictures[Math.floor(Math.random() * pictures.length)];
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const shift = (Math.random() - 0.5) * 6; // éloigne du centre du segment

    addPictureInsideWall(A, B, tex, 2.0, side, shift);
  }
}
addRandomPictures(40);

function buildFloorBetweenWalls(path) {
  for (let i = 0; i < path.length - 1; i++) {
    const A = path[i], B = path[i + 1];
    const dx = B.x - A.x, dz = B.z - A.z;
    const len = Math.hypot(dx, dz);

    const midX = (A.x + B.x) / 2;
    const midZ = (A.z + B.z) / 2;

    const geo = new THREE.BoxGeometry(len, 0.05, corridorWidth);
    const mesh = new THREE.Mesh(geo, floorMat);

    mesh.position.set(midX, 0.025, midZ);
    mesh.rotation.y = Math.atan2(dz, dx);
    scene.add(mesh);
  }
}

const halfOffset = corridorWidth / 2 + wallThickness / 2;
const offs = computeOffsets(PATH, halfOffset);
buildWallMesh(offs.left);
buildWallMesh(offs.right);
buildFloorBetweenWalls(PATH);

camera.position.set(35, 55, 80);
camera.lookAt(30, 0, 40);
camera.fov = 30;
camera.updateProjectionMatrix();

function animate() {
  requestAnimationFrame(animate);
  const t = Date.now() * 0.0002;
  camera.position.x = 80 * Math.cos(t);
  camera.position.z = 80 * Math.sin(t);
  camera.lookAt(30, 0, 40);
  renderer.render(scene, camera);
}
animate();

