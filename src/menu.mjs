import { engine } from "./engine.mjs";
//gnusni hardcodnati chisla

class Menu {
    constructor(){
    }
    draw(){
        //play button
        engine.context2d.fillStyle = "red";
        engine.context2d.fillRect(275,200,250,100);
        engine.context2d.fillStyle = "white";
        engine.context2d.font = "50px Arial";
        engine.context2d.fillText("Play",350,267);
        //music toggle button - will be replaced with icon
        if(music){
            engine.context2d.fillStyle = "red";
        }else{
            engine.context2d.fillStyle = "grey";
        }
        engine.context2d.fillRect(175,350,200,75);
        engine.context2d.fillStyle = "white";
        engine.context2d.font = "30px Arial";
        engine.context2d.fillText("Toggle music",190,400);
        //sfx toggle button - will be replaced with icon
        if(sfx){
            engine.context2d.fillStyle = "red";
        }else{
            engine.context2d.fillStyle = "grey";
        }
        engine.context2d.fillRect(425,350,200,75);
        engine.context2d.fillStyle = "white";
        engine.context2d.font = "30px Arial";
        engine.context2d.fillText("Toggle SFX",447,400);
    }
    startSimulation(){
        engine.context2d.globalAlpha = 0;
    }
    toggleMusic(){
        music = !music
    }
    toggleSfx(){
        sfx = !sfx
    }
}

export { Menu };
