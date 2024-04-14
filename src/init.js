import { engine} from "./engine.mjs";
import { game } from "./game.mjs"
import { initGlobalImages } from "./asset_loader.mjs";
import { loadLiminalTextureLib } from "./BuildingBlocks/Visuals.mjs";
    
document.body.onload = () => {
    console.log("ASDFG: Front end scripts starting.");
    initGlobalImages();
    //load the images via the new workflow that has new customisation
    loadLiminalTextureLib();
    //initGLobalSounds();
    engine.init();
    game.init();
};