// Customized Built-In Element

// Pop up a modal to confirm link to another website

alert(
  `This Web Component Script for the - Go to Google Website? - Link Implements the Following:
  1) Creation of a Customized Built-In Element Based on the Anchor Element
  2) Before linking to another website this Customized Element will call the confirm() method to display a dialog box with the text - Do you really want to leave? with OK and Cancel buttons.
  `
);

class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' });
