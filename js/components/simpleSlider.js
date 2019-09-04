'use strict';

class Slider extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {

    let sliderFront = document.createElement('div');
    sliderFront.classList.add('audio__slider__front');

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
          width: 10%;
          background: #BA55D3;
          
          border-radius: 10px;
          margin: 0;
          padding: 0;
        }
      </style>
    `;

    sliderContainer.onmousedown = function(evt) {

      let sliderCoords = getCoords(sliderContainer);
      move(evt);

      document.onmousemove = function(evt) {
        move(evt);
      };

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };

      function move(evt) {
        let left = evt.pageX- sliderCoords.left;

        if (left < 0) {
          left = 0;
        }
        let right = sliderContainer.offsetWidth;

        if (left > right) {
          left = right;
        }

        sliderFront.style.width = left/right * 100 + '%';

        sliderFront.dispatchEvent(new CustomEvent('slide', {
          bubbles: true,
          composed: true,
          detail: (max - min) * (left / right)
        }));
      }
    };

    sliderFront.ondragstart = function() {
      return false;
    };

    this.shadowRoot.appendChild(sliderContainer);

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
