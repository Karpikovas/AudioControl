'use strict';

class Slider extends HTMLElement {

  constructor() {
    super();
    this.sliderFront = '';
  }

  connectedCallback() {

    let sliderFront = document.createElement('div');
    sliderFront.classList.add('audio__slider__front');

    this.sliderFront = sliderFront;

    let sliderContainer = document.createElement('div');
    sliderContainer.classList.add('audio__slider__back');

    sliderContainer.appendChild(sliderFront);


    let value = this.getAttribute('value') || undefined;
    let min = this.getAttribute('min') || 0;
    let max = this.getAttribute('max') || 100;


    let sliderWidth = 13.5 + 'em';

    if (this.hasAttribute('small')) {
      sliderWidth = 6 + 'em';
    }


    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        .audio__slider__back {
          height: 0.5em;
          width: ${sliderWidth};
          background: #DDA0DD;
          border-radius: 10px;
        
        }
        
        .audio__slider__front {
          height: 100%;
          width: ${value}%;
          background: #BA55D3;
          
          border-radius: 10px;
          margin: 0;
          padding: 0;
        }
      </style>
    `;

    sliderContainer.onmousedown = (evt) => {

      let move = (evt) => {
        let left = evt.pageX - sliderCoords.left;

        if (left < 0) {
          left = 0;
        }
        let right = sliderContainer.offsetWidth;

        if (left > right) {
          left = right;
        }
        this.value = (max - min) * (left / right);
      };

      let sliderCoords = getCoords(sliderContainer);
      move(evt);

      document.onmousemove = (evt) => {
        move(evt);
      };

      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
    };

    sliderFront.ondragstart = function () {
      return false;
    };

    this.shadowRoot.appendChild(sliderContainer);

  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.dispatchEvent(new CustomEvent('slide', {
      bubbles: true,
      composed: true
    }));
    if (this.sliderFront) {
      this.sliderFront.style.width = newValue + '%'
    }
  }

  get value() {
    return this.getAttribute('value');
  }
  set value(value) {
    this.setAttribute('value', value);
  }

}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

customElements.define('simple-slider', Slider);
