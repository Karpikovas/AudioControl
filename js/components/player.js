
function Player(options) {
  const CONTAINER = options.container;
  var audioElement;

  function render() {
    audioElement = document.createElement('audio');
    audioElement.setAttribute('controls', 'controls');
    CONTAINER.appendChild(audioElement);
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
    audioControl.addEventListener('play', ()=>console.log('pl'));
  }

  return {
    render: render,
    addTrack: addTrack
  };

}
