export class AudioController {
  musicOn;
  soundOn;

  audioCtx;
  soundCtx;
  tracks;

  constructor() {
    this.musicOn = true;
    this.soundOn = true;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.audioGain = this.audioCtx.createGain();
    this.audioGain.connect(this.audioCtx.destination);
    this.soundCtx = new AudioContext();
    this.soundGain = this.soundCtx.createGain();
    this.soundGain.connect(this.soundCtx.destination);
    this.tracks = {};
  }

  async init(tracks, menuMusic) {
    const btnMusicToggle = document.getElementById("toggleMusic");
    const btnSoundToggle = document.getElementById("toggleSound");

    btnMusicToggle.onclick = () => {
      this.toggleMusic();
    };
    btnSoundToggle.onclick = () => {
      this.toggleSound();
    };

    const promises = [];
    for (const track of tracks) {
      promises.push(this.loadTrack(track));
    }
    await Promise.all(promises);
    this.play(menuMusic);
  }

  play(trackName) {
    const track = this.tracks[trackName];
    if (track) {
      let source;
      if (track.sound) {
        source = this.soundCtx.createBufferSource();
        source.connect(this.soundGain);
      } else {
        source = this.audioCtx.createBufferSource();
        source.connect(this.audioGain);
      }
      source.buffer = track.buffer;
      if (track.loop) source.loop = true;
      source.start();
    } else console.warn('[ AudioController ] "' + trackName + '" not found !');
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
              track.buffer = buffer;
              this.tracks[track.name] = track;
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

  toggleMusic() {
    this.musicOn = !this.musicOn;

    if (this.musicOn) {
      document.getElementById("music-off").style.display = "none";
      document.getElementById("music-on").style.display = "";
      this.audioGain.gain.setValueAtTime(1, this.audioCtx.currentTime);
    } else {
      document.getElementById("music-on").style.display = "none";
      document.getElementById("music-off").style.display = "";
      this.audioGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
  }

  toggleSound() {
    this.soundOn = !this.soundOn;

    if (this.soundOn) {
      document.getElementById("sound-off").style.display = "none";
      document.getElementById("sound-on").style.display = "";
      this.soundGain.gain.setValueAtTime(1, this.soundCtx.currentTime);
    } else {
      document.getElementById("sound-on").style.display = "none";
      document.getElementById("sound-off").style.display = "";
      this.soundGain.gain.setValueAtTime(0, this.soundCtx.currentTime);
    }
  }
}
