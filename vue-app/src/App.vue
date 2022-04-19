<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Transaction } from '../../vanilla-app/src/types'
import { formatCurrency, initialState } from './helpers'
import Form from './Form.vue'

const transactions = ref<Transaction[]>([])
const totalBalance = ref(0)
const incomeBalance = ref(0)
const outgoBalance = ref(0)

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

function addTransaction({ title, amount }: Transaction) {
  if (amount === NaN) {
    return alert('Digite um número válido')
  }

  const newTransaction = {
    title,
    amount: amount * 100,
  }
  transactions.value = [...transactions.value, newTransaction]
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
        {{ formatCurrency(totalBalance) }}
      </div>
    </div>

    <div class="balance-report">
      <div class="income-balance">
        <div class="balance-report-title">Receitas</div>
        <div class="balance-report-value income-color">
          {{ formatCurrency(incomeBalance) }}
        </div>
      </div>
      <div class="outgo-balance">
        <div class="balance-report-title">Despesas</div>
        <div class="balance-report-value outgo-color">
          {{ formatCurrency(outgoBalance) }}
        </div>
      </div>
    </div>
  </section>

  <section class="transactions">
    <strong>Transações</strong>
    <ul class="transactions-list">
      <li v-for="transaction in transactions" :key="transaction.title">
        <span>{{ transaction.title }}</span>
        <span
          v-bind:class="[
            transaction.amount >= 0 ? 'income-color' : 'outgo-color',
          ]"
        >
          {{ transaction.amount >= 0 ? '+' : '-' }}
          {{ formatCurrency(Math.abs(transaction.amount)) }}
        </span>
      </li>
    </ul>
  </section>

  <section>
    <strong>Adicionar transação</strong>
    <Form @submit="addTransaction" />
  </section>
</template>

<style scoped>
.transactions {
  background-color: black;
}
</style>
