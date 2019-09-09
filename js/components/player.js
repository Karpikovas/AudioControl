
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

  /*---------------Добавление нового трека-----------------*/
  function addTrack(src) {
    let audioControl = new AudioControl(src);
    CONTAINER.appendChild(audioControl);

    let source = document.createElement('source');
    source.setAttribute('src', src);
    source.setAttribute('type', 'audio/mpeg');

    audioElement.appendChild(source);

    if (currentAudioControl === undefined) {
      currentAudioControl = audioControl;
      currentAudioControl.enable();
    }

    bindAudioEvents(audioControl);
  }

  /*------------------События интерфейса аудио-------------------------*/
  function bindAudioEvents(audioControl) {
    audioControl.addEventListener('play', () => {

      if (currentAudioControl !== audioControl) {
        if (!audioElement.paused) {
          currentAudioControl.togglePlay();
          audioElement.pause();
        }
        loadNextTrack(audioControl);
      }
      audioElement.play();
    });


    audioControl.addEventListener('pause', () => {audioElement.pause()});
    audioControl.addEventListener('volumechange', (e) => {
      audioElement.volume = audioControl.volume;
    });

    audioControl.addEventListener('timechange', (e) => {
      audioElement.currentTime = e.detail * audioElement.duration / 100;
    });

    audioControl.addEventListener('speedchange', () => audioElement.playbackRate = audioControl.speed);
  }

  /*----------События тэга Audio---------------------*/
  function bindEvents() {
    audioElement.ontimeupdate = function() {
      if (currentAudioControl) {
        currentAudioControl.value = audioElement.currentTime / audioElement.duration * 100;
      }
    };

    audioElement.onended = function () {
      currentAudioControl.togglePlay();
      if (currentAudioControl.nextSibling) {
        loadNextTrack(currentAudioControl.nextSibling);
        currentAudioControl.togglePlay();
      } else {
        currentAudioControl.value = 0;
      }
    };

  }

  /*------------Загрузка следующего трека------------------*/
  function loadNextTrack(elem) {

    currentAudioControl.disable();
    currentAudioControl.value = 0;

    currentAudioControl = elem;
    currentAudioControl.enable();

    audioElement.src = elem.src;
    audioElement.load();
  }

  return {
    render: render,
    addTrack: addTrack
  };

}
