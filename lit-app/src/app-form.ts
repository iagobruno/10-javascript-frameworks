import { html, css, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import type { Transaction } from '../../vanilla-app/src/types'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('app-form')
export class AppForm extends LitElement {
  @state() title = ''
  @state() amount = ''

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: <Transaction>{
          title: this.title,
          amount: Number(this.amount),
        },
      })
    )
    this.title = ''
    this.amount = ''
  }

  render() {
    return html`
      <div>
        <form
          id="create-transaction-form"
          @submit="${this.handleSubmit.bind(this)}"
        >
          <div class="inputs">
            <input
              type="text"
              name="title"
              placeholder="Título..."
              value="${this.title}"
              @input="${(e) =>
                (this.title = (e.currentTarget as HTMLInputElement).value)}"
            />
            <input
              type="number"
              name="amount"
              placeholder="Valor"
              step="1"
              value="${this.amount}"
              @input="${(e) =>
                (this.amount = (e.currentTarget as HTMLInputElement).value)}"
            />
          </div>
          <button type="submit">Adicionar</button>
        </form>
        <div class="form-helper-text">
          Use valores positivos para receitas e negativos para despesas.
        </div>
      </div>
    `
  }

  static styles = css`
    #create-transaction-form {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
      margin: 6px 0 0;
    }

    #create-transaction-form .inputs {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    #create-transaction-form input {
      appearance: none;
      border: unset;
    }

    #create-transaction-form input[name='title'] {
      width: 100%;
      padding: 12px 0px 12px 12px;
    }
    #create-transaction-form input[name='amount'] {
      width: 80px;
      padding: 12px;
    }
    #create-transaction-form input[name='amount']::before {
      content: 'R$ ';
    }
    #create-transaction-form button {
      background-color: #007aff;
      border: none;
      border-radius: 0 0 4px 4px;
      width: 100%;
      padding: 10px;
      font-size: 0.98em;
      color: #fff;
      cursor: pointer;
    }

    .form-helper-text {
      opacity: 0.7;
      font-size: 0.9em;
      margin-top: 8px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'app-form': AppForm
  }
}
