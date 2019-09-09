'use strict';

const volumeTemplate = document.createElement('template');

volumeTemplate.innerHTML = `
  <style>
    .audio__item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: transparent;
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
  </style>
  <simple-slider small="" value="50" class="audio__item" min="0" max="100"></simple-slider>
  <a class="audio__item audio__icon"><i class="fas fa-volume-down"></i></a>
  <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all">
`;


class VolumeSlider extends HTMLElement {

  constructor() {
    super();

    /*---------------Создание Shadow Root------------*/
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(volumeTemplate.content.cloneNode(true));

    this.slider = this.shadowRoot.querySelector('simple-slider');
    this.btnVolume = this.shadowRoot.querySelector('a');
    this.volumeIcon = this.shadowRoot.querySelector('i');

    this.bindEvents();
  }


  connectedCallback() {
    this.volume = this.getAttribute('volume') || undefined;
  }

  get volume() {
    return this.getAttribute('volume');
  }
  set volume(value) {
    this.setAttribute('volume', value);
  }

  static get observedAttributes() {
    return ['volume'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true
    }));
  }

  bindEvents() {

    /*---------Изменение атрибута громкости по слайдеру-----------------*/
    this.slider.addEventListener('slide', (e) => {

      this.volume = this.slider.value / 100;

      if (this.volume == 0) {
        toggleIcon(this.volumeIcon, 'fa-volume-down', 'fa-volume-mute');
      } else if (this.volume > 0 && this.volumeIcon.classList.contains('fa-volume-mute')) {
        toggleIcon(this.volumeIcon, 'fa-volume-mute', 'fa-volume-down');
      }
    });

    /*---------Изменение атрибута громкости по нажатию на кнопку-----------------*/
    this.btnVolume.onclick = () => {

      if (this.volumeIcon.classList.contains('fa-volume-down')) {

        toggleIcon(this.volumeIcon, 'fa-volume-down', 'fa-volume-mute');

        this.volume = 0;
        this.slider.value = 0;

      } else {

        toggleIcon(this.volumeIcon, 'fa-volume-mute', 'fa-volume-down');

        this.volume = 0.3;
        this.slider.value = 30;

      }
    };
  }

}

function toggleIcon(icon, remove, add) {
  icon.classList.remove(remove);
  icon.classList.add(add);
}
customElements.define('volume-slider', VolumeSlider);
