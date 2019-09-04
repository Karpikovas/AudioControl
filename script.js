(function () {
    const CONTAINER = document.querySelector('main');
    const BTNADD = document.querySelector('.input-file');

    function Audio(options) {
        var path = options.path;

        var audioElement;
        var audioControl;

        var btnPlay;
        var btnVolume;
        var btnSpeed;

        var playIcon;
        var volumeIcon;

        var volumeSlider;

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
            btnPlay = document.createElement('a');
            btnPlay.classList.add('audio__item');
            btnPlay.classList.add('audio__icon');

            playIcon = document.createElement('i');
            playIcon.classList.add('fas');
            playIcon.classList.add('fa-play');

            btnPlay.appendChild(playIcon);

            /*--------------Кнопка Volume---------------------*/
            btnVolume = document.createElement('a');
            btnVolume.classList.add('audio__item');
            btnVolume.classList.add('audio__icon');

            volumeIcon = document.createElement('i');
            volumeIcon.classList.add('fas');
            volumeIcon.classList.add('fa-volume-down');

            btnVolume.appendChild(volumeIcon);

            /*-------------Volume Slider-------------------*/

            let volumeSliderContainer = document.createElement('div');
            volumeSliderContainer.classList.add('audio__item');

            volumeSlider = document.createElement('input');
            volumeSlider.setAttribute('type', 'range');
            volumeSlider.setAttribute('min', '0');
            volumeSlider.setAttribute('max', '100');
            volumeSlider.setAttribute('value', '100');
            volumeSlider.classList.add('slider');

            volumeSliderContainer.appendChild(volumeSlider);

            /*-----------Progress bar----------------------*/
            let progressBarBack = document.createElement('div');
            progressBarBack.classList.add('audio__item');
            progressBarBack.classList.add('audio__progress-bar__back');

            progressBarFront = document.createElement('div');
            progressBarFront.classList.add('audio__item');
            progressBarFront.classList.add('audio__progress-bar__front');

            progressBarBack.appendChild(progressBarFront);

            /*----------------Кнопка скорости-------------*/
            btnSpeed = document.createElement('div');
            btnSpeed.classList.add('audio__item');
            btnSpeed.classList.add('text-label');
            btnSpeed.innerText = '1x';

            /*-----------Элемент интерфейса аудио--------------*/
            audioControl = document.createElement('div');
            audioControl.classList.add('audio');

            audioControl.appendChild(btnPlay);
            audioControl.appendChild(progressBarBack);
            audioControl.appendChild(volumeSliderContainer);
            audioControl.appendChild(btnVolume);
            audioControl.appendChild(btnSpeed);

            /*--------Название аудио------------------*/
            let title = document.createElement('div');
            title.classList.add('text-label');
            title.innerText = path;


            CONTAINER.appendChild(title);
            CONTAINER.appendChild(audioControl);

            bindEvents();
        }

        function bindEvents() {

            btnPlay.onclick = function () {
                if (playIcon.classList.contains('fa-play')) {
                    audioElement.play();
                    toggleIcon(playIcon, 'fa-play', 'fa-stop');
                } else {
                    audioElement.pause();
                    toggleIcon(playIcon, 'fa-stop', 'fa-play');
                }
            };

            btnVolume.onclick = function () {
                if (volumeIcon.classList.contains('fa-volume-down')) {
                    toggleIcon(volumeIcon, 'fa-volume-down', 'fa-volume-mute');
                    audioElement.volume = 0;
                    volumeSlider.setAttribute('disabled', 'disabled');
                } else {
                    toggleIcon(volumeIcon, 'fa-volume-mute', 'fa-volume-down');
                    audioElement.volume = 1;
                    volumeSlider.removeAttribute('disabled');
                }
            };
            btnSpeed.onclick = function () {
                if (audioElement.playbackRate === 1) {
                    btnSpeed.innerText = '2x';
                    audioElement.playbackRate = 2;
                } else {
                    btnSpeed.innerText = '1x';
                    audioElement.playbackRate = 1;
                }

            };

            audioElement.ontimeupdate = function () {
                progressBarFront.style.transform = `scale(${audioElement.currentTime / audioElement.duration}, 1)`;
            };

            /*----------Нужно для определения продолжительности аудио------*/
            audioElement.ondurationchange = function () {
                // let duration = document.createElement('div');
                // duration.classList.add('text-label');
                // duration.innerText = audioElement.duration;
                //
                // audioControl.appendChild(duration);
            };

            audioElement.onended = function () {
                toggleIcon(playIcon, 'fa-stop', 'fa-play');
            };

            volumeSlider.oninput = function () {
                audioElement.volume = volumeSlider.value / 100;

                if (volumeSlider.value == 0) {

                    toggleIcon(volumeIcon, 'fa-volume-down', 'fa-volume-mute');
                } else if (volumeSlider.value > 0 && volumeIcon.classList.contains('fa-volume-mute')) {
                    toggleIcon(volumeIcon, 'fa-volume-mute', 'fa-volume-down');
                }
            };

        }

        function toggleIcon(icon, remove, add) {
            icon.classList.remove(remove);
            icon.classList.add(add);
        }


        this.render = render;
    }

    function init() {
        bindEvents();
    }

    function bindEvents() {
        BTNADD.addEventListener('change', getFile, false);
    }

    function getFile() {
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
