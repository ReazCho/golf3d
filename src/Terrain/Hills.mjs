import * as THREE from "three";
import { engine } from "../engine.mjs";
import * as CANNON from "cannon-es";
import { materials } from "../asset_loading/assets_3d.mjs";

function createHillsBufferGeometry(width, depth, segments, maxHeight) {
    const geometry = new THREE.BufferGeometry();

    const vertices = [];

    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const y = Math.sin(i * 0.1) * maxHeight;

        vertices.push(x, y, 0);
    }

    const positions = new Float32Array(vertices);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.MeshBasicMaterial({ color: "green" });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-width / 2, 0, -depth / 2);
    engine.scene.add(mesh);
}

export {createHillsBufferGeometry};