export function Audio(options) {
    var path = options.path;

    var audioElement;
    var audioControl;

    var btnPlay;
    var btnVolume;

    var playIcon;
    var volumeIcon;

    var progressBarFront;

    function render() {
        /*----------------Элемент Audio------------*/
        audioElement = document.createElement('audio');
        audioElement.setAttribute('controls', 'controls');

        let source = document.createElement('source');
        source.setAttribute('src', path);
        source.setAttribute('type', 'audio/mpeg');

        audioElement.appendChild(source);
        CONTAINER.appendChild(audioElement);


        /*--------------Кнопка Play---------------------*/
        btnPlay =  document.createElement('a');
        btnPlay.classList.add('audio__item');
        btnPlay.classList.add('audio__icon');

        playIcon = document.createElement('i');
        playIcon.classList.add('fas');
        playIcon.classList.add('fa-play');

        btnPlay.appendChild(playIcon);

        /*--------------Кнопка Play---------------------*/
        btnVolume =  document.createElement('a');
        btnVolume.classList.add('audio__item');
        btnVolume.classList.add('audio__icon');

        volumeIcon = document.createElement('i');
        volumeIcon.classList.add('fas');
        volumeIcon.classList.add('fa-volume-down');

        btnVolume.appendChild(volumeIcon);

        /*-----------Progress bar----------------------*/
        let progressBarBack = document.createElement('div');
        progressBarBack.classList.add('audio__item');
        progressBarBack.classList.add('audio__progress-bar__back');

        progressBarFront = document.createElement('div');
        progressBarFront.classList.add('audio__item');
        progressBarFront.classList.add('audio__progress-bar__front');

        progressBarBack.appendChild(progressBarFront);

        /*-----------Элемент интерфейса аудио--------------*/
        audioControl = document.createElement('div');
        audioControl.classList.add('audio');

        audioControl.appendChild(btnPlay);
        audioControl.appendChild( progressBarBack);
        audioControl.appendChild(btnVolume);

        /*--------Название аудио------------------*/
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

        btnVolume.onclick = function() {
            if (volumeIcon.classList.contains('fa-volume-down')) {
                volumeIcon.classList.remove('fa-volume-down');
                volumeIcon.classList.add('fa-volume-mute');
                audioElement.volume = 0;
            } else {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-down');
                audioElement.volume = 1;
            }
        };

        audioElement.ontimeupdate = function(){
            progressBarFront.style.transform = `scale(${audioElement.currentTime/audioElement.duration}, 1)`;
        };

        /*----------Нужно для определения продолжительности аудио------*/
        audioElement.ondurationchange = function(){
            console.log(audioElement.duration);
        };

        audioElement.onended = function(){
            playIcon.classList.remove('fa-stop');
            playIcon.classList.add('fa-play');
        };

    }


    this.render = render;
}
