document.addEventListener("DOMContentLoaded", () => {
const tableaux = document.querySelectorAll(".tableau-libre");
const ecriteaux = document.querySelectorAll(".ecriteau"); // sélectionne tous les boutons
const maxDistance = 500;

const updateSpotlights = () => {
const viewportCenter = window.scrollX + window.innerWidth / 2;

tableaux.forEach(tableau => {
  const rect = tableau.getBoundingClientRect();
  const tableauCenter = rect.left + rect.width / 2 + window.scrollX;

  const distance = Math.abs(viewportCenter - tableauCenter);

  // brightness progressif
  let brightness = 1.5 - (distance / maxDistance) * 1.2;
  if (brightness < 0.3) brightness = 0.5;
  if (brightness > 1.5) brightness = 1;

  tableau.style.filter = `brightness(${brightness})`;
});

// applique le même brightness aux boutons
ecriteaux.forEach(ecriteau => {
  const rect = ecriteau.getBoundingClientRect();
  const ecriteauCenter = rect.left + rect.width / 2 + window.scrollX;

  const distance = Math.abs(viewportCenter - ecriteauCenter);

  let brightness = 1.5 - (distance / maxDistance) * 1.2;
  if (brightness < 0.3) brightness = 0.3;
  if (brightness > 1.5) brightness = 1;

  ecriteau.style.filter = `brightness(${brightness})`;
});

};

window.addEventListener("scroll", updateSpotlights);
updateSpotlights(); // initial
});

const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Scene dédiée au personnage
const scene = new THREE.Scene();

// Camera légère de côté
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 1.6, 3);

// Lumière douce
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

const loader = new THREE.GLTFLoader();
let mixer = null;

loader.load("perso.glb", (gltf) => {

    const model = gltf.scene;
    model.scale.set(1,1,1);
    model.position.set(0, 0, 0);

    scene.add(model);

    // Animations Mixamo
    mixer = new THREE.AnimationMixer(model);
    if (gltf.animations.length > 0){
        mixer.clipAction(gltf.animations[0]).play();
    }
});

function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(0.016);
    renderer.render(scene, camera);
}
animate();


