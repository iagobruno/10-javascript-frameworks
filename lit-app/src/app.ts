import { html, css, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import type { Transaction } from '../../vanilla-app/src/types'
import { formatCurrency, initialState } from './helpers'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-app')
export class MyApp extends LitElement {
  @state() transactions: Transaction[] = initialState
  @state() totalBalance = 0
  @state() incomeBalance = 0
  @state() outgoBalance = 0

  willUpdate(changedProps: Map<string, unknown>) {
    if (changedProps.has('transactions')) {
      this.recalcBalances()
    }
  }

  private recalcBalances() {
    let totalBalance = 0
    let incomeBalance = 0
    let outgoBalance = 0

    for (const { amount } of this.transactions) {
      if (amount >= 0) {
        incomeBalance += amount
      } else {
        outgoBalance += Math.abs(amount)
      }
      totalBalance += amount
    }

    this.totalBalance = totalBalance
    this.incomeBalance = incomeBalance
    this.outgoBalance = outgoBalance
  }

  private addTransaction(event: CustomEvent<Transaction>) {
    const { title, amount } = event.detail
    const newTransaction = {
      title,
      amount: amount * 100,
    }
    this.transactions = [...this.transactions, newTransaction]
  }

  render() {
    return html`
      <div id="root">
        <header>
          <h1 class="app-title">Controle financeiro</h1>
          <div class="app-description">
            Feito com <img src="/lit-logo.png" class="logo" /> LitJS.
          </div>
        </header>
        <section>
          <div class="user-balance">
            <div class="user-balance-title">Saldo atual</div>
            <div class="user-balance-value">
              ${formatCurrency(this.totalBalance)}
            </div>
          </div>

          <div class="balance-report">
            <div class="income-balance">
              <div class="balance-report-title">Receitas</div>
              <div class="balance-report-value income-color">
                ${formatCurrency(this.incomeBalance)}
              </div>
            </div>
            <div class="outgo-balance">
              <div class="balance-report-title">Despesas</div>
              <div class="balance-report-value outgo-color">
                ${formatCurrency(this.outgoBalance)}
              </div>
            </div>
          </div>
        </section>

        <section class="transactions">
          <strong>Transações</strong>
          <ul class="transactions-list">
            ${this.transactions.map((transaction) => {
              const isIncome = transaction.amount >= 0
              return html`
                <li>
                  <span>${transaction.title}</span>
                  <span class="${isIncome ? 'income' : 'outgo'}-color">
                    ${isIncome ? '+' : '-'}
                    ${formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </li>
              `
            })}
          </ul>
        </section>

        <section>
          <strong>Adicionar transação</strong>
          <app-form @submit="${this.addTransaction}"></app-form>
        </section>
      </div>
    `
  }

  static styles = css`
    * {
      box-sizing: border-box;
      margin: unset;
      font-size: 1rem;
    }

    #root {
      width: min(460px, 100vw);
      margin-inline: auto;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .app-title {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
    }

    .app-description {
      text-align: center;
      font-size: 0.84rem;
      color: rgb(0 0 0 / 70%);
      margin-top: 6px;
    }

    .logo {
      display: inline-block;
      vertical-align: middle;
      object-fit: contain;
      height: 25px;
      width: 25px;
    }

    .user-balance {
      margin-bottom: 12px;
    }
    .user-balance-value {
      color: rgb(35, 106, 213);
    }

    .user-balance-title {
      font-size: 1.1rem;
      font-weight: normal;
      margin-bottom: 2px;
    }
    .user-balance-value {
      font-size: 1.9rem;
      font-weight: bold;
    }

    .balance-report {
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
      padding: 12px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .balance-report > div:first-child {
      border-right: 1px solid rgb(0 0 0 / 10%);
    }

    .income-balance,
    .outgo-balance {
      padding: 0 16px;
      width: 50%;
    }

    .balance-report-title {
      font-size: 0.96em;
    }
    .balance-report-value {
      font-size: 1.2em;
      font-weight: bold;
    }

    .income-color {
      color: rgb(35, 203, 69);
    }
    .outgo-color {
      color: red;
    }

    .transactions-list {
      display: block;
      list-style: none;
      padding: 0;
      margin: 6px 0 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .transactions-list > li {
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
      display: flex;
      justify-content: space-between;
      padding: 12px 10px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp
  }
}
