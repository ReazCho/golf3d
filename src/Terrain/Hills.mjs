import * as THREE from "three";
import { engine } from "../engine.mjs";
import * as CANNON from "cannon-es";
import { materials } from "../asset_loading/assets_3d.mjs";

function createHillsBufferGeometry(width, depth, segments, maxHeight) {
    const geometry = new THREE.BufferGeometry();

    // Vertices array to hold the positions of the vertices
    const vertices = [];

    // Loop through segments to create hills
    for (let i = 0; i <= segments; i++) {
        // Calculate the position along the width
        const x = (i / segments) * width;

        // Calculate the height of the hill
        const y = Math.sin(i * 0.1) * maxHeight;

        // Push the vertex position to the vertices array
        vertices.push(x, y, 0);
    }

    // Create Float32Array from the vertices array
    const positions = new Float32Array(vertices);
    
    // Add positions attribute to the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create material
    const material = new THREE.MeshBasicMaterial({ color: "green" });

    // Create mesh using the buffer geometry and material
    const mesh = new THREE.Mesh(geometry, material);

    // Position the mesh
    mesh.position.set(-width / 2, 0, -depth / 2);

    // Add mesh to the scene
    engine.scene.add(mesh);
}

export {createHillsBufferGeometry};