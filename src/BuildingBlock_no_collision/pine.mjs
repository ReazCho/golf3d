import * as THREE from "three";
import { engine } from "../engine.mjs";
import { materials } from "../asset_loading/assets_3d.mjs";

function createPineTree(scene, x, y, z) {
    // Trunk
    var trunkGeometry = new THREE.CylinderGeometry(0.3, 0.3, 5, 8);
    var trunk = new THREE.Mesh(trunkGeometry, materials.Wood);
    trunk.position.set(x, y + 2, z);
    scene.add(trunk);

    // Function to create a level of cones
    function createCones(level, height) {
        var numCones = level * 2 + 1; // Increasing cones per level
        var angleIncrement = Math.PI * 2 / numCones;
        var radius = level * 0.8; // Increasing radius per level
        for (var i = 0; i < numCones; i++) {
            var angle = angleIncrement * i;
            var xOffset = Math.cos(angle) * radius;
            var zOffset = Math.sin(angle) * radius;
            var cone = new THREE.Mesh(new THREE.ConeGeometry(level, height, 8), materials.Grass);
            cone.position.set(x + xOffset, y + 4 + level * height, z + zOffset);
            cone.rotation.y = angle;
            scene.add(cone);
            if (level > 1) { // Create branches for higher levels
                createCones(level - 1, height * 0.8);
            }
        }
    }

    // Call createCones to start creating branches
    createCones(3, 0.5); // Adjust level and height parameters as needed
}
export {createPineTree};
