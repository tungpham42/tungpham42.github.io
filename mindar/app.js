import { MindAR } from "mindar";

// Create a new MindAR instance
const mindar = new MindAR({
  container: "#mindar-container", // The ID of the container where AR will be displayed
  assets: [
    { type: "image", src: "./sun.jpg" }, // AR target image
  ],
});

// Start MindAR
mindar
  .start()
  .then(() => {
    console.log("MindAR started successfully.");
  })
  .catch((err) => {
    console.error("Error starting MindAR:", err);
  });
mindar.addContent({
  type: "3d-model",
  src: "./solar-system.glb", // Path to your GLB model file
  position: { x: 0, y: 0, z: 0 }, // Position of the model
  scale: { x: 1, y: 1, z: 1 }, // Scale of the model
});
