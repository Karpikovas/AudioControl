(function () {
    const CONTAINER = document.querySelector('main');

    function init() {
        let options = {
            container: CONTAINER
        };

        let player = new Player(options);
        player.render();

        player.addTrack('audio/audio.mp3');
        player.addTrack('audio/audio2.mp3');
    }

    window.addEventListener('load', function () {
        init();
    });

})();
