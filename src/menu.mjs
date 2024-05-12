import { engine } from "./engine.mjs";
import { createButton } from "./utils.mjs";
import { playMusic } from "./Sounds.mjs";
//gnusni hardcodnati chisla

class Menu {
    constructor(){
    }
    draw(){
        //play button
        createButton("Play",275,175,250,100,"red",50,"white");
        //skins button - no functionality
        createButton("Skins",275,300,250,100,"red",50,"white");
        //music toggle button - should be replaced with icon
        if(musicEnabled){
            createButton("Toggle music",175,475,200,75,"red",30,"white");
        }else{
            createButton("Toggle music",175,475,200,75,"grey",30,"white");
        }
        //SFX toggle button - should be replaced with icon
        if(sfxEnabled){
            createButton("Toggle SFX",425,475,200,75,"red",30,"white");
        }else{
            createButton("Toggle SFX",425,475,200,75,"grey",30,"white");
        }
    }
    startSimulation(){
        engine.context2d.globalAlpha = 0;
        gameStarted = true;
        if(musicEnabled){ //there is no pause menu so this should work for now
            playMusic();
        }
    }
    toggleMusic(){
        musicEnabled = !musicEnabled
    }
    toggleSfx(){
        sfxEnabled = !sfxEnabled
    }
}

export { Menu };
