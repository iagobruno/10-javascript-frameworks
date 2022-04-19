<script lang="ts">
  import { formatCurrency, initialState } from './helpers'
  import type { Transaction } from '../../vanilla-app/src/types'
  import logo from './svelte.png'

  // STATES
  let transactions: Transaction[] = initialState
  let totalBalance = 0
  let incomeBalance = 0
  let outgoBalance = 0
  let title = ''
  let amount = ''

  $: {
    totalBalance = 0
    incomeBalance = 0
    outgoBalance = 0

    for (const { amount } of transactions) {
      if (amount >= 0) {
        incomeBalance += amount
      } else {
        outgoBalance += Math.abs(amount)
      }
      totalBalance += amount
    }
  }

  function handleSubmit() {
    const amountVal = Number(amount)
    if (amountVal === NaN) {
      return alert('Digite um número válido')
    }

    const newTransaction = {
      title,
      amount: amountVal * 100,
    }
    transactions = [...transactions, newTransaction]

    title = ''
    amount = ''
  }
</script>

<header>
  <h1 class="app-title">Controle financeiro</h1>
  <div class="app-description">
    Feito com <img src={logo} class="logo" /> Svelte.
  </div>
</header>

<section>
  <div class="user-balance">
    <div class="user-balance-title">Saldo atual</div>
    <div class="user-balance-value">
      {formatCurrency(totalBalance)}
    </div>
  </div>

  <div class="balance-report">
    <div class="income-balance">
      <div class="balance-report-title">Receitas</div>
      <div class="balance-report-value income-color">
        {formatCurrency(incomeBalance)}
      </div>
    </div>
    <div class="outgo-balance">
      <div class="balance-report-title">Despesas</div>
      <div class="balance-report-value outgo-color">
        {formatCurrency(outgoBalance)}
      </div>
    </div>
  </div>
</section>

<section class="transactions">
  <strong>Transações</strong>
  <ul class="transactions-list">
    {#each transactions as transaction (transaction.title)}
      {@const isIncome = transaction.amount >= 0}
      <li>
        <span>{transaction.title}</span>
        <span class={`${isIncome ? 'income' : 'outgo'}-color`}>
          {isIncome ? '+' : '-'}{' '}
          {formatCurrency(Math.abs(transaction.amount))}
        </span>
      </li>
    {/each}
  </ul>
</section>

<section>
  <strong>Adicionar transação</strong>
  <form id="create-transaction-form" on:submit|preventDefault={handleSubmit}>
    <div class="inputs">
      <input
        type="text"
        name="title"
        bind:value={title}
        placeholder="Título..."
      />
      <input
        type="number"
        name="amount"
        bind:value={amount}
        placeholder="Valor"
        step="1"
      />
    </div>
    <button type="submit">Adicionar</button>
  </form>
  <div class="form-helper-text">
    Use valores positivos para receitas e negativos para despesas.
  </div>
</section>
