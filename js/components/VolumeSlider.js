'use strict';

class VolumeSlider extends HTMLElement {
  constructor() {
    super();
  }


  connectedCallback() {
    this.volume = this.getAttribute('volume') || undefined;

    let slider = document.createElement('simple-slider');
    slider.setAttribute('small', '');
    slider.setAttribute('value', this.volume);
    slider.classList.add('audio__item');



    let btnVolume = document.createElement('a');
    btnVolume.classList.add('audio__item');
    btnVolume.classList.add('audio__icon');

    let volumeIcon = document.createElement('i');
    volumeIcon.classList.add('fas');
    volumeIcon.classList.add('fa-volume-down');

    btnVolume.appendChild(volumeIcon);

    let fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://kit-free.fontawesome.com/releases/latest/css/free.min.css';
    fontAwesome.media = "all";


    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `

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
    `;

    slider.addEventListener('slide', () => {
      this.volume = slider.value / 100;
      if (slider.value == 0) {
        toggleIcon(volumeIcon, 'fa-volume-down', 'fa-volume-mute');
      } else if (slider.value > 0 && volumeIcon.classList.contains('fa-volume-mute')) {
        toggleIcon(volumeIcon, 'fa-volume-mute', 'fa-volume-down');
      }
    });

    btnVolume.onclick = () => {
      if (volumeIcon.classList.contains('fa-volume-down')) {
        toggleIcon(volumeIcon, 'fa-volume-down', 'fa-volume-mute');
        this.volume = 0;
        slider.value = 0;
      } else {
        toggleIcon(volumeIcon, 'fa-volume-mute', 'fa-volume-down');
        this.volume = 1;
        slider.value = 30;
      }
    };


    this.shadowRoot.appendChild(slider);
    this.shadowRoot.appendChild(btnVolume);
    this.shadowRoot.appendChild(fontAwesome);
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


}
function toggleIcon(icon, remove, add) {
  icon.classList.remove(remove);
  icon.classList.add(add);
}
customElements.define('volume-slider', VolumeSlider);
