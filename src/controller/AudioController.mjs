export class AudioController {
  musicOn;
  soundOn;
  musicManager;
  soundManager;

  constructor() {
    this.musicOn = true;
    this.soundOn = true;

    this.audioManager = new Audio();
    this.soundManager = new Audio();
  }

  init() {
    const btnMusicToggle = document.getElementById("toggleMusic");
    const btnSoundToggle = document.getElementById("toggleSound");

    btnMusicToggle.onclick = () => {
      this.toggleMusic();
    };
    btnSoundToggle.onclick = () => {
      this.toggleSound();
    };
  }

  toggleMusic() {
    this.musicOn = !this.musicOn;

    document.getElementById("music-on").style.display = this.musicOn
      ? ""
      : "none";
    document.getElementById("music-off").style.display = this.musicOn
      ? "none"
      : "";
  }

  toggleSound() {
    this.soundOn = !this.soundOn;

    document.getElementById("sound-on").style.display = this.soundOn
      ? ""
      : "none";
    document.getElementById("sound-off").style.display = this.soundOn
      ? "none"
      : "";
  }
}
