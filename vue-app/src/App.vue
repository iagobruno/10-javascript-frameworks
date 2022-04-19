<script setup lang="ts">
  import { ref, watch, reactive, onMounted } from 'vue'
  import type { Transaction } from '../../vanilla-app/src/types'
  import { formatCurrency, initialState } from './helpers'

  const transactions = ref<Transaction[]>([])
  const totalBalance = ref(0)
  const incomeBalance = ref(0)
  const outgoBalance = ref(0)

  const formState = reactive({
    title: '',
    amount: '',
  })

  onMounted(() => {
    transactions.value = initialState
  })

  watch(transactions, () => {
    console.log('transactions atualizou!')
    totalBalance.value = 0
    incomeBalance.value = 0
    outgoBalance.value = 0

    for (const { amount } of transactions.value) {
      if (amount >= 0) {
        incomeBalance.value += amount
      } else {
        outgoBalance.value += Math.abs(amount)
      }
      totalBalance.value += amount
    }
  })

  function handleSubmit() {
    const amountVal = Number(formState.amount)
    if (amountVal === NaN) {
      return alert('Digite um número válido')
    }

    const newTransaction = {
      title: formState.title,
      amount: amountVal * 100,
    }
    transactions.value = [...transactions.value, newTransaction]
    formState.title = ''
    formState.amount = ''
  }
</script>

<template>
  <header>
    <h1 class="app-title">Controle financeiro</h1>
    <div class="app-description">
      Feito com <img src="vue.png" class="logo" /> Vue.
    </div>
  </header>
  <section>
    <div class="user-balance">
      <div class="user-balance-title">Saldo atual</div>
      <div class="user-balance-value">
        {{formatCurrency(totalBalance)}}
      </div>
    </div>

    <div class="balance-report">
      <div class="income-balance">
        <div class="balance-report-title">Receitas</div>
        <div class="balance-report-value income-color">
          {{formatCurrency(incomeBalance)}}
        </div>
      </div>
      <div class="outgo-balance">
        <div class="balance-report-title">Despesas</div>
        <div class="balance-report-value outgo-color">
          {{formatCurrency(outgoBalance)}}
        </div>
      </div>
    </div>
  </section>

  <section class="transactions">
    <strong>Transações</strong>
    <ul class="transactions-list">
      <li v-for="transaction in transactions">
        <span>{{transaction.title}}</span>
        <span v-bind:class="[transaction.amount >= 0 ? 'income-color' : 'outgo-color']">
          {{transaction.amount >= 0 ? '+' : '-'}}
          {{formatCurrency(Math.abs(transaction.amount))}}
        </span>
      </li>
    </ul>
  </section>

  <section>
    <strong>Adicionar transação</strong>
    <form id="create-transaction-form" v-on:submit.prevent="handleSubmit">
      <div class="inputs">
        <input
          type="text"
          name="title"
          v-model="formState.title"
          placeholder="Título..."
        />
        <input
          type="number"
          name="amount"
          v-model="formState.amount"
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
</template>
