import { engine } from "./engine.mjs";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import OrbitControls_ from 'three-orbit-controls';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Ramp } from "./BuildingBlocks/Ramp.mjs";
import { BuildingBlock } from "./BuildingBlocks/BuildingBlock.mjs";
import { MovingPlatform } from "./BuildingBlocks/MovingPlatform.mjs";
import { Cylinder } from "./BuildingBlocks/Cylinder.mjs";
//Visuals for the game
import { Skybox, skybox_texture } from "./asset_loading/assets_3d.mjs";
import { firingTheBall } from "./firingTheBall.mjs";
import { initSoundEvents } from "./Sounds.mjs";
import { createPineTree } from "./BuildingBlock_no_collision/pine.mjs";
import { createBall, ballMesh, ballBody } from "./ball.mjs";
import { createNewEmitter, updateEmitters } from "./BuildingBlocks/Particle.mjs";
import { Menu } from "./menu.mjs";
import { areColliding } from "./utils.mjs";
import { createHillsBufferGeometry } from "./Terrain/Hills.mjs";

const orbitControls = true;

let oldBallPosision = { x: 0, y: 0, z: 0 };

function createGround() {
    // Create ground plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 2, shape: groundShape });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // Set rotation to align with Cannon.js
    groundBody.position.set(0, 0, 0); // Set position
    engine.cannonjs_world.addBody(groundBody);

    // Create visual representation of ground (in Three.js)
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2; // Rotate to align with Cannon.js
    engine.scene.add(groundMesh);
}

function initCamera() {
    // Init camera
    engine.camera.position.set(0, 20, 80);
    engine.camera.lookAt(0, 10, 0);

    //change far frustum plane to account for skybox
    engine.camera.far = 10000;
}

function initLights() {
    //Ambient light is now the skybox
    const ambientLight = new THREE.AmbientLight(skybox_texture, 0.5);
    engine.scene.add(ambientLight);

    //directional light is white to not tint the phong material too much
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.lookAt(0, 0, 0);
    engine.scene.add(directionalLight);
}

function initLevel() {
    // createGround();
    const block1 = new BuildingBlock(0, 5, 0, 20, 10, 20);
    // const block2 = new BuildingBlock(20, 0, 0, 50, 10, 20);

    // new BuildingBlock(0, 5, 0, 20, 10, 20);
    new Ramp(16.5, 2.5, 0, 20, Math.PI, Math.PI / 4);
    new Ramp(33, -5.2, 0, 20, 0, 0);

    new BuildingBlock(30, -10, 0, 40, 10, 20);

    new MovingPlatform(15, 20, 20, 30, 30, 30, 20, 1, 15);
    new Cylinder(25, 0, 2, 5, 5);
    createPineTree(engine.scene, 25, 5, 2);

}
let time = 0, obx = 0, oby = 0, obz = 0;
let controls = null;
window.gameStarted = false;
function initGame() {
    initSoundEvents();

    // Create ball and attach to window
    createBall(5, 30, 0);

    createHillsBufferGeometry(20, 20, 20, 10);
    // Init slider and buttons for firing the ball
    firingTheBall.initUI();

    // Init orbit controls
    if (orbitControls) {
        // const OrbitControls = new OrbitControls_(THREE);
        controls = new OrbitControls(engine.camera, engine.canvas2d);
        controls.target = ballMesh.position;
    }

    // Setup camera position
    initCamera();

    initLights();

    // Init skybox
    const skybox = new Skybox();

    // IMPORTANT! - called when the play button is clicked
    //initLevel();

    //DEBUG spawn test emitter

    let lastDX, lastDY, lastDZ;

    // Set custom update function
    engine.update = (() => {

        time++;
        controls.update();

        //update all particle systems
        updateEmitters()

        // Update ball mesh position
        ballMesh.position.copy(ballBody.position);

        // TODO: Playing sounds on ball bounce
        let bounceGranica = 2;
        if(Math.abs(lastDX - ballBody.velocity.x) > bounceGranica || 
        Math.abs(lastDY - ballBody.velocity.y) > bounceGranica ||
        Math.abs(lastDZ - ballBody.velocity.z) > bounceGranica) {
            console.log("TUP");
            createNewEmitter(ballBody.position.x, ballBody.position.y, ballBody.position.z, "burst", {particle_cnt: 50, particle_lifetime: {min:0.2, max:0.5}, power: 0.05, fired: false})
        }
        lastDX = ballBody.velocity.x;
        lastDY = ballBody.velocity.y;
        lastDZ = ballBody.velocity.z;


        // Makes the ball static when it isn't moving
        if (time % 100 == 0) {
            let error = 0, bx = Math.abs(ballMesh.position.x), by = Math.abs(ballMesh.position.y), bz = Math.abs(ballMesh.position.z);

            if (bx - obx >= 0) {
                error = bx - obx;
            } else {
                error = bx + obx;
            }

            if (by - oby >= 0) {
                error += by - oby;
            } else {
                error += by + oby;
            }

            if (bz - obz >= 0) {
                error += bz - obz;
            } else {
                error += bz + obz;
            }

            if (error < 1) {
                ballBody.type = CANNON.Body.STATIC;
                oldBallPosision = { x: 0, y: 0, z: 0 };
            }

            obx = Math.abs(ballMesh.position.x);
            oby = Math.abs(ballMesh.position.y);
            obz = Math.abs(ballMesh.position.z);
        }

        // Gets the angle between the camera and the ball so you can shoot at the direction you are looking
        firingTheBall.direction = Math.atan2(ballMesh.position.z - engine.camera.position.z, ballMesh.position.x - engine.camera.position.x);
    });

    
    let menu = new Menu();
    // Set custom draw function
    window.music = true;
    window.sfx = true;
    engine.draw2d = (() => {
        engine.context2d.clearRect(0, 0, engine.canvas2d.width, engine.canvas2d.height);
        engine.context2d.strokeRect(0, 0, canvas2d.width, canvas2d.height);
        menu.draw()
    });
    engine.onmouseup = ((e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        console.log(e,mouseX,mouseY)
        //play button
        if(areColliding(mouseX,mouseY,1,1,275,200,250,100)){ //Play
            //initGame();
            gameStarted = true;
            initLevel();
            menu.startSimulation();
        }
        if(areColliding(mouseX,mouseY,1,1,275,200,250,100)){ //Music
            menu.toggleMusic()
        }
        if(areColliding(mouseX,mouseY,1,1,275,200,250,100)){ //Sfx
            menu.toggleSfx()
        }
    })
}

let game = {
    init: initGame
}

export { game }