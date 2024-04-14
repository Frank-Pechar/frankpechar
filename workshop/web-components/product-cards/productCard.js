// Autonomous Custom Element

// Shadow DOM and scoped CSS
// Slots
// Removing Custom Element and disconnectedCallback
// Observe and modify attribute values with observedAttributes & attributeChangedCallback

alert(
  `This Web Component Script Implements the Following:
  1) Creation of a ProductCard - Autonomous Custom Element
  2) Usage of Shadow DOM for Scoped CSS
  3) Slots Placeholders
  4) Removing Custom Element and Using disconnectedCallback Function
  5) Observe and Modify Attribute Values with observedAttributes & attributeChangedCallback
  `
);

const template = document.createElement('template');
template.innerHTML = `
   <style>
       img{
           width: 60%;
           height: 200px;
           margin: 20%;
           margin-bottom: 5%;
       }
       .card{
           width: 300px;
           height: 440px;
           box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
       }
	     .product-info {
           padding: 2px 16px;
       }
       button{
           width: 75%;
           padding: 6px;
           margin-top: 2%;
           margin-bottom: 8%;
           background-color: rgb(40, 140, 255);
           color: rgb(255, 255, 255);
           display: inline-block;
           border: none;
           font-size: 18px;
           position : relative;
           top: 3px;
       }
       #trash{
           position : relative;
           top: 3px;
           width: 23%;
           padding: 3px;
       }
       #icon{
           font-size: 19px;
           padding: 4px;
       }
       #ptitle{
           color: blue;
           position : absolute;
           padding-left : 10px;
       }
   </style>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   <div class="card">
       <div id="ptitle"><slot name="ptitle"></slot></div>
       <img/>
       <div class="product-info">
           <h3></h3>
           <p id="status"> Not Sold </p>
           <button> Buy </button>
           <button id="trash"> <i class="fa fa-trash-o" id="icon"></i> </button>
       </div>
   </div>
`;

class ProductCard extends HTMLElement {
  // Build card component
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText =
      this.getAttribute('pName') +
      ' - ' +
      this.getAttribute('price') +
      ' - ' +
      this.getAttribute('pQty');
    this.shadowRoot.querySelector('img').src = this.getAttribute('pImg');
    this.shadowRoot.querySelector('p').innerText = this.getAttribute('status');
  }
  connectedCallback() {
    // Change status of product sale
    this.shadowRoot.querySelector('button').onclick = () => {
      this.status = 'Sold';
    };
    // Remove product card from container
    this.shadowRoot.getElementById('trash').addEventListener('click', () => {
      this.remove();
    });
  }

  // Set status of product sale to 'Sold'
  set status(val) {
    this.setAttribute('status', val);
  }

  // Observe status of product sale
  static get observedAttributes() {
    return ['status'];
  }

  // Updates status of product sale
  attributeChangedCallback(attr, oldVal, newVal) {
    this.shadowRoot.querySelector('p').innerText = newVal;
  }

  // Removes Product Card
  disconnectedCallback() {
    alert(this.getAttribute('pName') + ' Product Will Be Removed');
  }
}

window.customElements.define('product-card', ProductCard);
