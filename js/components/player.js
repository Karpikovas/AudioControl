
function Player(options) {
  const CONTAINER = options.container;
  var audioElement;
  var currentAudioControl;

  function render() {
    audioElement = document.createElement('audio');
    audioElement.setAttribute('controls', 'controls');
    audioElement.setAttribute('preload', 'auto');

    CONTAINER.appendChild(audioElement);

    bindEvents();
  }

  function addTrack(src) {
    let audioControl = new AudioControl(src);
    CONTAINER.appendChild(audioControl);

    let source = document.createElement('source');
    source.setAttribute('src', src);
    source.setAttribute('type', 'audio/mpeg');

    audioElement.appendChild(source);
    bindAudioEvents(audioControl);
  }

  function bindAudioEvents(audioControl) {
    audioControl.addEventListener('play', () => {

      audioElement.currentTime = 12;

      audioElement.play();
      if (currentAudioControl !== audioControl) {
        currentAudioControl = audioControl;

      }
    });


    audioControl.addEventListener('pause', () => {audioElement.pause()});
    audioControl.addEventListener('volumechange', () => {
      // let tue = audioControl.volume;
      // audioElement.volume = tue.toFixed(1)

    });

    audioControl.addEventListener('timechange', () => {
    });
  }

  function bindEvents() {


    audioElement.ontimeupdate = function() {
      if (currentAudioControl) {
        currentAudioControl.value = audioElement.currentTime / audioElement.duration * 100;
      }
    };

  }

  return {
    render: render,
    addTrack: addTrack
  };

}
