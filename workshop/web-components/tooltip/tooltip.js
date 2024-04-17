// Autonomous Custom Element

// Shadow DOM and scoped CSS
// Styling Slots
// Observe and modify attribute values with observedAttributes & attributeChangedCallback

alert(
  `This Tooltip Web Component Script Implements the Following:
  1) Creation of a Tooltip - Autonomous Custom Element
  3) Usage of Shadow DOM for Scoped CSS
  4) Slots and Styling Slots
  5) Observe and Modify Attribute Values with observedAttributes & attributeChangedCallback
  `
);

class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = 'This Is Component Default Tooltip Text.';
    // Attach Shadow DOM then insert HTML
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
            div {
                font-weight: normal;
                background-color: black;
                color: white;
                position: absolute;
                top: 1.5rem;
                left: 0.75rem;
                z-index: 10;
                padding: 0.5rem;
                border-radius: .3rem;
                box-shadow:1px 1px 6px rgba(0,0,0,0.26);
            }

            :host {
              position: relative;
            }

            :host(.important) {
              background: var(--color-primary, #ccc);
              padding: 0.15rem;
            }

            :host-context(p) {
              font-weight: bold;
            }

            ::slotted(.highlight) {
              background-color: orange;
            }

            .icon {
              background: black;
              color: white;
              padding: 0.15rem 0.5rem;
              text-align: center;
              border-radius: 50%;
            }
        </style>
        <slot>Component Default Tooltip Label</slot>
        <span class="icon">?</span>
    `;
  }

  // Initialization - Replace default text, add tooltip event listeners
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this)
    );
  }

  // Note: This method (attributeChangedCallback) initially called before connectedCallback
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  // Note: This static getter (observedAttributes) initially called before constructor, attributeChangedCallback, and connectCallback
  static get observedAttributes() {
    return ['text'];
  }

  disconnectedCallback() {
    console.log('Any Clean Up Code for Disconnected Element');
  }

  // Display or remove popup tooltip
  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('uc-tooltip', Tooltip);
