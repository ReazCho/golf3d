export function playRandomSoundEffect(volume = 0.7) {
  const soundFiles = [
    "./music/golf ball hit 1.wav",
    "./music/golf ball hit 2.wav",
    "./music/golf ball hit 3.wav",
    "./music/golf ball hit 4.wav",
  ];

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  const randomIndex = getRandomIndex(soundFiles.length);
  const soundFile = soundFiles[randomIndex];

  const audio = new Audio(soundFile);
  audio.volume = volume;
  audio.play();
}
let isMusicPlaying = false;
export function playMusic(musicFile, volume = 0.4) {
  var audio = new Audio(musicFile);
  if (audio) {
    audio.src = musicFile;
    audio.loop = true;
    audio.play().then(() => { // Handle play promise
      isMusicPlaying = false; // Reset flag after playback ends (or error)
    }).catch(() => {
      isMusicPlaying = false; // Reset flag in case of errors
    });
    audio.volume = volume;
  }
};



