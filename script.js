(function () {
  const CONTAINER = document.querySelector('main');
  const BTNADD = document.querySelector('.input-file');

/*
  <div class="audio">
    <a class="audio__item audio__icon">
      <i class="fas fa-play"></i>
    </a>

    <div class="audio__item audio__progress-bar__back">
      <div class="audio__item audio__progress-bar__front"></div>
    </div>

    <a class="audio__item audio__icon">
      <i class="fas fa-stop"></i>
    </a>

  </div>
*/
  function Audio(options) {
    var path = options.path;

    var audioElement;
    var audioControl;
    var btnPlay;
    var playIcon;
    var progressBarFront;

    function render() {
      audioElement = document.createElement('audio');
      audioElement.setAttribute('controls', 'controls');

      let source = document.createElement('source');
      source.setAttribute('src', path);
      source.setAttribute('type', 'audio/mpeg');

      audioElement.appendChild(source);
      CONTAINER.appendChild(audioElement);

      audioControl = document.createElement('div');
      audioControl.classList.add('audio');

      btnPlay =  document.createElement('a');
      btnPlay.classList.add('audio__item');
      btnPlay.classList.add('audio__icon');

      playIcon = document.createElement('i');
      playIcon.classList.add('fas');
      playIcon.classList.add('fa-play');

      let progressBarBack = document.createElement('div');
      progressBarBack.classList.add('audio__item');
      progressBarBack.classList.add('audio__progress-bar__back');

      progressBarFront = document.createElement('div');
      progressBarFront.classList.add('audio__item');
      progressBarFront.classList.add('audio__progress-bar__front');

      progressBarBack.appendChild(progressBarFront);
      btnPlay.appendChild(playIcon);

      audioControl.appendChild(btnPlay);
      audioControl.appendChild( progressBarBack);

      let title = document.createElement('div');
      title.classList.add('text-label');
      title.innerText = path;


      CONTAINER.appendChild(title);
      CONTAINER.appendChild(audioControl);

      

      bindEvents();
    }

    function bindEvents() {

      btnPlay.onclick = function() {

        if (playIcon.classList.contains('fa-play')) {
          audioElement.play();
          playIcon.classList.remove('fa-play');
          playIcon.classList.add('fa-stop');
        } else {
          audioElement.pause();
          playIcon.classList.remove('fa-stop');
          playIcon.classList.add('fa-play');
        }  

      };

      audioElement.addEventListener('timeupdate', function(){
        progressBarFront.style.transform = `scale(${audioElement.currentTime/audioElement.duration}, 1)`;
      }, false);

      /*----------Нужно для определения продолжительности аудио------*/
      audioElement.addEventListener('durationchange', function(){
        console.log(audioElement.duration);
      }, false);

      audioElement.addEventListener('ended', function(){
        playIcon.classList.remove('fa-stop');
        playIcon.classList.add('fa-play');
      }, false);

    }


    this.render = render;
  }

  function init() {
    bindEvents();
  }

  function bindEvents() {
    BTNADD.addEventListener('change', getFileName, false);
  }

  function getFileName() {
    let options = {
      path: BTNADD.value.split('\\').pop()
    };

    let audio = new Audio(options);
    audio.render();
  }
  window.addEventListener('load', function () {
      init();
    });
  
})();
