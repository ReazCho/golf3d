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
//simply use materials.xmaterial or materials["xmaterial"] and it will return a material for a THREE.js mesh
let materials = {
    BrickConcrete: new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load('./images/LiminalTextureLib/BrickConcrete1.jpg')}),
    Concrete1: new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load('./images/LiminalTextureLib/Concrete1.jpg')}),
    Concrete2: new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load('./images/LiminalTextureLib/Concrete3.jpg')}),
    Grass: new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load('./images/LiminalTextureLib/Grass1.jpg')}),
    Metal1: new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load('./images/LiminalTextureLib/Metal1.jpg')}),
    Planks1: new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load('./images/LiminalTextureLib/Planks1.jpg')}),
    Wood: new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load('./images/LiminalTextureLib/Wood2.jpg')}),
}
export {Skybox, skybox_texture, materials}