// Initialisation de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Contrôles de la caméra (navigation)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lumière ambiante et directionnelle
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Création du labyrinthe de galeries
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
const wallThickness = 0.2;
const wallHeight = 5;

// Fonction pour créer




// ======= TABLEAUX FIXES =======
const fixedPictures = [
{seg:1, url:'Sean Yoro.jpg', side:'left', shift:-2},
{seg:2, url:'« Le cœur des Andes » (1859), de Frederic Edwin Church.jpg', side:'right', shift:1},
{seg:3, url:'https://youtu.be/_1Vgeose43g', side:'left', shift:0},
{seg:4, url:'Bansky.jpg', side:'right', shift:-1.5},
{seg:5, url:'Cambona-mer de nuages.jpg', side:'left', shift:0.5},
{seg:6, url:'David-Cécile-Ollichon', side:'right', shift:1.2},
{seg:7, url:'Déchets.jpg', side:'left', shift:-0.7},
{seg:8, url:'Ducrot-Gaspard-Vanessa-Meynet-Arcimboldo.jpg', side:'right', shift:0.3}
];

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