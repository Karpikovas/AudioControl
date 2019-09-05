'use strict';

const audioTemplate = document.createElement('template');

audioTemplate.innerHTML = `
  <style>
    .audio {
      margin: 1em;
      height: 2.5em;
      width: 31em;
    
      background: #9370DB;
      border-radius: 10px;
      border: 2px dashed white;
    }
    .audio__item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: transparent;  
      margin: 5px 10px 0;
    }
    .audio__icon {
      height: 2em;
      width: 2em;
      color: white;
      opacity: 0.6;
    }
    .audio__icon:hover {
      opacity: 1;
    }
    .text-label {
      text-align: center;
      color: white;
      cursor: default;
    }
  </style>
  
  <div class="text-label"></div>
  <div class="audio">
  
    <a class="audio__item audio__icon">
      <i class="fas fa-play" aria-hidden="true"></i>
    </a>
    
    <simple-slider min="0" max="100" value="0" class="audio__item"></simple-slider>
    
    <volume-slider volume="50" class="audio__item"></volume-slider>
    
    
    <div class="audio__item text-label">1x</div>
    
  </div>
  <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all">
`;


class AudioControl extends HTMLElement {
  constructor(src) {
    super();

    this.src = src;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(audioTemplate.content.cloneNode(true));

    this.textLabel = this.shadowRoot.querySelector('.text-label');
    this.btnPlay = this.shadowRoot.querySelector('.audio__icon');
    this.playIcon = this.shadowRoot.querySelector('.fas');

    console.log(this.btnPlay, this.playIcon);

    this.volumeSlider = this.shadowRoot.querySelector('volume-slider');

    this.bindEvents();
  }


  connectedCallback() {
    this.textLabel.innerText = this.src;

  }

  static get observedAttributes() {
    // return ['volume'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.dispatchEvent(new CustomEvent('change', {
    //   bubbles: true,
    //   composed: true
    // }));
  }
  get src() {
    return this.getAttribute('src') || undefined;
  }

  set src(value) {
    this.setAttribute('src', value);
  }

  get volume() {
    return this.getAttribute('volume') || undefined;
  }

  set volume(value) {
    this.setAttribute('volume', value);
  }

  bindEvents() {
    this.btnPlay.onclick = () => {
      if (this.playIcon.classList.contains('fa-play')) {
        this.dispatchEvent(new CustomEvent('play', {
          bubbles: true,
          composed: true
        }));
        toggleIcon(this.playIcon, 'fa-play', 'fa-stop');
      } else {
        this.dispatchEvent(new CustomEvent('pause', {
          bubbles: true,
          composed: true
        }));
        toggleIcon(this.playIcon, 'fa-stop', 'fa-play');
      }
    };

    this.volumeSlider.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('volumechange', {
        bubbles: true,
        composed: true
      }));
      this.volume = this.volumeSlider.volume;
    })
  }

}
function toggleIcon(icon, remove, add) {
  icon.classList.remove(remove);
  icon.classList.add(add);
}
customElements.define('audio-control', AudioControl);
