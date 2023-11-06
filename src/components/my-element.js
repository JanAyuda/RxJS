import { LitElement, css, html } from 'lit'
import { dataManager } from '..'

export class MyElement extends LitElement {
  static get properties() {
    return {
      count: { type: Number },
      id: { type: Number },
      inputValue: { type: String }, 
      errorMessage: { type: String },
    }
  }

  constructor() {
    super()
    this.count = 0
    this.inputValue = ''
    this.errorMessage = ''
  }

  connectedCallback() {
    super.connectedCallback()
    DataManager.updateData(this.id, this.count)
  }

  render() {
    return html`
      <div class="margin">
        <input
          type="text"
          .value="${this.inputValue}"
          @input="${this._onInput}"
          @change="${this._onChange}"
        >
        <p class="error-message">${this.errorMessage}</p>
      </div>
    `
  }

  _onInput(event) {
    this.inputValue = event.target.value
  }

  _onChange() {
    const numberValue = Number(this.inputValue)
    if (!isNaN(numberValue)) {
      this.count = numberValue
      this.errorMessage = ''
    } else {
      this.errorMessage = 'Please enter a valid number.'
    }

    dataManager.updateData(this.id, this.count)
  }

  static get styles() {
    return css`
      .error-message {
        color: red;
      }
      .margin {
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 16px;
      }
    `
  }
}

window.customElements.define('my-element', MyElement)