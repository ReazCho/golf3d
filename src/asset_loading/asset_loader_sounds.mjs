import {randomSounds, bgMusicFileName} from "./asset_config.mjs";

let preloadedSounds = {
    randomSoundsArr: [],
    bgMusicSound: null
};
function initSounds() {
    for(let soundPath of randomSounds) {
        const audio = new Audio(soundPath);
        preloadedSounds.randomSoundsArr.push(audio);
    }
    preloadedSounds.bgMusicSound = new Audio(bgMusicFileName);
}

export {preloadedSounds, initSounds};