// Autonomous Custom Element

// Use Event constructor and dispatchEvent
// Shadow DOM and scoped CSS
// Slots and slot change event
// Observe and modify attribute values with observedAttributes & attributeChangedCallback

alert(
  `This Web Component Script Implements the Following:
  1) Creation of a Modal - Autonomous Custom Element
  2) Created and Triggered Event with Event Constructor and dispatchEvent
  3) Usage of Shadow DOM for Scoped CSS
  4) Slots and Slot Change Event
  5) Observe and Modify Attribute Values with observedAttributes & attributeChangedCallback
  `
);

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }
        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }
        :host([opened]) #modal {
          top: 15vh;
        }
        #modal {
          position: fixed;
          z-index: 100;
          top: 10vh;
          left: 25%;
          background: white;
          border-radius: 3px;
          box-shadow:0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-out;
        }
        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }
        ::slotted(h2) {
          font-size: 1.5rem;
          margin: 0;
        }
        #main {
          padding: 1rem;
        }
        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        #actions button {
          margin: 0 0.25rem;
        }
      </style>

      <div id='backdrop'></div>
      <div id='modal'>
        <header>
          <slot name='title'>Default Message</slot>
        </header>
        <section id='main'>
          <slot></slot>
        </section>
        <section id='actions'>
          <button id='cancel-btn'>Cancel</button>
          <button id='confirm-btn'>Okay</button>
        </section>
      </div>
    `;
  }

  // Initialization after DOM attachment
  connectedCallback() {
    const backdrop = this.shadowRoot.querySelector('#backdrop');
    const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
    const confirmButtonModal = this.shadowRoot.querySelector('#confirm-btn');
    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButtonModal.addEventListener('click', this._confirm.bind(this));
    backdrop.addEventListener('click', this._cancel.bind(this));
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[0].addEventListener('slotchange', (e) => {
      console.log(`slotchange event for - ${slots[0].assignedNodes()[0]}`);
      console.log(slots[0].assignedNodes()[0]);
    });
  }

  // Observe and log modal opened attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Modal attribute changed');
  }

  static get observedAttributes() {
    return ['opened'];
  }

  // Display modal
  open() {
    modalTitle.textContent = 'Confirm';
    this.setAttribute('opened', '');
  }

  // Hide modal
  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
  }

  // Cancel modal confirmation
  _cancel(event) {
    this.hide();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  // Confirm modal with Okay button
  _confirm() {
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
    modalTitle.textContent = 'Confirmed!';
    setTimeout(() => {
      this.hide();
    }, 500);
  }
}

customElements.define('uc-modal', Modal);
