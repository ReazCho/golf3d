import * as THREE from "three.js";
import { engine } from "../engine.mjs";

let skybox_texture = new THREE.TextureLoader().load('./images/SkyboxTexture.jpg')
class Skybox {
    constructor() {
        this.x = 0
        this.y = 0
        this.z = 0

        //Load texture
        

        //Threejs setup
        this.geometry = new THREE.SphereGeometry(500, 32, 16)
        this.material = new THREE.MeshBasicMaterial({map: skybox_texture, side: THREE.BackSide, fog: false, })
        this.mesh = new THREE.Mesh( this.geometry, this.material);


        //Add to scene
        this.mesh.position.set(this.x, this.y, this.z)
        engine.scene.add(this.mesh)
    }
}

function RegisterNewMaterial(name, path, tilingx, tilingy, tint, metalness, roughness) {
    let _tex = new THREE.TextureLoader().load(path)
    _tex.wrapS = THREE.RepeatWrapping
    _tex.wrapT = THREE.RepeatWrapping
    _tex.repeat.set(tilingx, tilingy)
    if(metalness == undefined) metalness = 0;
    if(roughness == undefined) roughness = 0.8;
    materials[name] = new THREE.MeshStandardMaterial({color: tint, map: _tex, metalness: metalness, roughness: roughness})
}

function loadLiminalTextureLib() {
    RegisterNewMaterial("BrickConcrete", './images/LiminalTextureLib/BrickConcrete1.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("Brick", './images/LiminalTextureLib/Brick.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("Concrete1", './images/LiminalTextureLib/Concrete1.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("Concrete2", './images/LiminalTextureLib/Concrete3.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("Grass", './images/LiminalTextureLib/Grass1.jpg', 2, 2, 0xffffff);
    RegisterNewMaterial("Metal1", './images/LiminalTextureLib/Metal1.jpg', 1, 1, 0xffffff, 0.7, 0.5);
    RegisterNewMaterial("Planks1", './images/LiminalTextureLib/Planks1.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("Sand", './images/LiminalTextureLib/Sand.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("TreeBark", './images/LiminalTextureLib/TreeBark.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("Asphalt", './images/LiminalTextureLib/Asphalt.jpg', 1, 1, 0xffffff);
    RegisterNewMaterial("Wood", './images/LiminalTextureLib/Wood2.jpg', 1, 1, 0xffffff, 0, 0.5);
    RegisterNewMaterial("Metal2", './images/LiminalTextureLib/Metal2.jpg', 1, 1, 0xffffff, 0.7, 0.5);
    RegisterNewMaterial("Ice", './images/LiminalTextureLib/Ice.jpg', 1, 1, 0xffffff, 0.3, 0.2);
    RegisterNewMaterial("GolfBall", './images/LiminalTextureLib/GolfBall.jpg', 3, 3, 0xffffff, 0, 0.8);
}
//simply use materials.xmaterial or materials["xmaterial"] and it will return a material for a THREE.js mesh
let materials = {
    
}
export {Skybox, skybox_texture, materials, loadLiminalTextureLib}