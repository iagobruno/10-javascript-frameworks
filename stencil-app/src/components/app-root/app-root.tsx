import { Component, h, Listen, State, Watch } from '@stencil/core';
import type { Transaction } from '../../../../vanilla-app/src/types';
import { formatCurrency, initialState } from '../../helpers';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() transactions: Transaction[] = [];
  @State() totalBalance = 0;
  @State() incomeBalance = 0;
  @State() outgoBalance = 0;

  componentDidLoad() {
    this.transactions = initialState;
  }

  @Watch('transactions')
  watchStateHandler() {
    console.log('ATUALIZOU');
    let totalBalance = 0;
    let incomeBalance = 0;
    let outgoBalance = 0;

    for (const { amount } of this.transactions) {
      if (amount >= 0) {
        incomeBalance += amount;
      } else {
        outgoBalance += Math.abs(amount);
      }
      totalBalance += amount;
    }

    this.totalBalance = totalBalance;
    this.incomeBalance = incomeBalance;
    this.outgoBalance = outgoBalance;
  }

  @Listen('submit')
  addTransaction(event: CustomEvent<Transaction>) {
    const { title, amount } = event.detail;
    const newTransaction = {
      title,
      amount: amount * 100,
    };
    this.transactions = [...this.transactions, newTransaction];
  }

  render() {
    return (
      <div id="root">
        <header>
          <h1 class="app-title">Controle financeiro</h1>
          <div class="app-description">
            Feito com <img src="/assets/stencil.png" class="logo" /> StencilJS.
          </div>
        </header>
        <section>
          <div class="user-balance">
            <div class="user-balance-title">Saldo atual</div>
            <div class="user-balance-value">{formatCurrency(this.totalBalance)}</div>
          </div>

          <div class="balance-report">
            <div class="income-balance">
              <div class="balance-report-title">Receitas</div>
              <div class="balance-report-value income-color">{formatCurrency(this.incomeBalance)}</div>
            </div>
            <div class="outgo-balance">
              <div class="balance-report-title">Despesas</div>
              <div class="balance-report-value outgo-color">{formatCurrency(this.outgoBalance)}</div>
            </div>
          </div>
        </section>

        <section class="transactions">
          <strong>Transações</strong>
          <ul class="transactions-list">
            {this.transactions.map(transaction => {
              const isIncome = transaction.amount >= 0;
              return (
                <li key={transaction.title}>
                  <span>{transaction.title}</span>
                  <span class={`${isIncome ? 'income' : 'outgo'}-color`}>
                    {isIncome ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <strong>Adicionar transação</strong>
          <app-form />
        </section>
      </div>
    );
  }
}
