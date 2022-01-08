export class AudioController {
  musicOn;
  soundOn;
  musicManager;
  soundManager;

  audioCtx;
  sources;

  constructor() {
    this.musicOn = true;
    this.soundOn = true;

    this.audioManager = new Audio();
    this.soundManager = new Audio();

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.sources = {};
  }

  async init(tracks) {
    const promises = [];
    for (const track of tracks) {
      promises.push(this.loadTrack(track));
    }
    await Promise.all(promises);
    this.sources["ambient"].play();
  }

  loadTrack(track) {
    return new Promise((resolve) => {
      var request = new XMLHttpRequest();
      request.open("GET", track.url, true);
      request.responseType = "arraybuffer";

      // Decode asynchronously
      request.onload = () => {
        if (request.status == 200) {
          this.audioCtx.decodeAudioData(
            request.response,
            (buffer) => {
              const source = this.audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(this.audioCtx.destination);
              this.sources[track.name] = source;
              resolve();
            },
            function (e) {
              console.log("Error decoding audio data:" + e);
              resolve();
            }
          );
        } else {
          console.log(
            "Audio didn't load successfully; error code:" + request.statusText
          );
          resolve();
        }
      };
      request.send();
    });
  }

  async init(tracks) {
    const promises = [];
    for (const track of tracks) {
      promises.push(this.loadTrack(track));
    }
    await Promise.all(promises);
    this.sources.ambient.play();
    console.log(this.sources);
  }

  loadTrack(track) {
    return new Promise((resolve) => {
      var request = new XMLHttpRequest();
      request.open("GET", track.url, true);
      request.responseType = "arraybuffer";

      // Decode asynchronously
      request.onload = () => {
        if (request.status == 200) {
          this.audioCtx.decodeAudioData(
            request.response,
            (buffer) => {
              const source = this.audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(this.audioCtx.destination);
              this.sources[track.name] = source;
              resolve();
            },
            function (e) {
              console.log("Error decoding audio data:" + e);
              resolve();
            }
          );
        } else {
          console.log(
            "Audio didn't load successfully; error code:" + request.statusText
          );
          resolve();
        }
      };
      request.send();
    });
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
