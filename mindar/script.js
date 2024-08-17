const container = document.getElementById("container");

// Initialize MindAR
const mindar = new MindAR.MindAR({
  container: container,
  onReady: () => {
    console.log("MindAR is ready");
  },
});

// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Load GLB Model
const loader = new THREE.GLTFLoader();
let model;

loader.load(
  "./solar-system.glb",
  (gltf) => {
    model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, -5); // Position the model
  },
  undefined,
  (error) => {
    console.error("An error happened:", error);
  }
);

// Update renderer on window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// MindAR Logic
mindar.addEventListener("hover", () => {
  if (model) {
    model.visible = true;
  }
});

mindar.addEventListener("hoverOut", () => {
  if (model) {
    model.visible = false;
  }
});
