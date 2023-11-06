import { LitElement, html } from 'lit'
import { dataManager } from '..';

export class MyAddition extends LitElement {

  static get properties() {
    return {
      total: { type: Number },
    }
  }

  constructor() {
    super()
    this.total = 0;
  }

  connectedCallback() {
    super.connectedCallback()
    this.observer = dataManager.subscribeToData(
      counterMap => {
        this.total = 0;
        counterMap.forEach((value) => {
          this.total += value
        })
      }
    )
  }

  disconnectedCallback() {
    dataManager.unsubscribeFromData(this.observer)
    super.disconnectedCallback()
  }

  render() {
    return html`
      <h2>
        <div>= ${this.total}</div>
      </h2>
    `
  }
}

window.customElements.define('my-addition', MyAddition)