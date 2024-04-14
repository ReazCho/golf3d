
import { engine } from "../engine.mjs";
import { materials } from "../asset_loading/assets_3d.mjs";
import * as THREE from "three.js";

function createSnowman(scene, x, y) {
    // Snowman materials
    const snowMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // Snow material
    const coalMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 }); // Coal material

    // Snowman body parts
    const bottomSphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), snowMaterial);
    const middleSphere = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 32), snowMaterial);
    const topSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), snowMaterial);
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), coalMaterial);
    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), coalMaterial);
    let nose = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5, 16), new THREE.MeshBasicMaterial({ color: 0xffa500 })); // Orange nose
    const hatBase = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32), new THREE.MeshPhongMaterial({ color: 0x000000 })); // Black hat base
    const hatTop = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.4, 32), new THREE.MeshPhongMaterial({ color: 0x000000 })); // Black hat top

    // Positioning snowman parts
    bottomSphere.position.set(x, y + 1, 0);
    middleSphere.position.set(x, y + 2.5, 0);
    topSphere.position.set(x, y + 3.75, 0);
    leftEye.position.set(x - 0.2, y + 4, 0.5);
    rightEye.position.set(x + 0.2, y + 4, 0.5);
    nose.position.set(x, y + 3.75, 0.6);
    hatBase.position.set(x, y + 4.2, 0);
    hatTop.position.set(x, y + 4.6, 0);

    // Rotating the nose
    nose.rotation.x = Math.PI / 2; // Rotate around x-axis by 90 degrees

    // Adding snowman parts to the scene
    scene.add(bottomSphere);
    scene.add(middleSphere);
    scene.add(topSphere);
    scene.add(leftEye);
    scene.add(rightEye);
    scene.add(nose);
    scene.add(hatBase);
    scene.add(hatTop);
}

export { createSnowman };
