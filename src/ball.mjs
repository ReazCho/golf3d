import { engine } from "./engine.mjs";
import * as CANNON from "cannon-es";
import * as THREE from "three.js";
import { materials } from "./asset_loading/assets_3d.mjs";
let ballMesh, ballBody;

function createBall(x, y, z) {
    // Ball
    const ballMaterialPhysics = new CANNON.Material(); // Create a new material
    ballMaterialPhysics.friction = 1
    ballMaterialPhysics.restitution = 0.5; // Set the restitution coefficient to 0.5 (adjust as needed)
    ballMaterialPhysics.friction = 0.2;
    const ballShape = new CANNON.Sphere(1); // Radius 1
    ballBody = new CANNON.Body({ mass: 1, position: new CANNON.Vec3(x, y, z), shape: ballShape, material: ballMaterialPhysics});
    // Adds the Linear Damping to the ball.
    ballBody.linearDamping = 0.3;
    engine.cannonjs_world.addBody(ballBody);

    // Create visual representations (meshes)
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    // It is golf. The ball must be white
    const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    ballMesh = new THREE.Mesh(ballGeometry, materials.GolfBall);

    window.ballMesh = ballMesh;
    window.ballBody = ballBody;

    ballMesh.position.set(x, y, z);
    engine.scene.add(ballMesh);
}

export {ballMesh, ballBody, createBall};
