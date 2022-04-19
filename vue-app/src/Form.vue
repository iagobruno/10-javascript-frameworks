<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction } from '../../vanilla-app/src/types'

const emit = defineEmits<{
  (e: 'submit', values: Transaction): void
}>()

// STATES
const title = ref('')
const amount = ref('')

function handleSubmit() {
  emit('submit', {
    title: title.value,
    amount: Number(amount.value),
  })
  title.value = ''
  amount.value = ''
}
</script>

<template>
  <form id="create-transaction-form" @submit.prevent="handleSubmit">
    <div class="inputs">
      <input type="text" name="title" v-model="title" placeholder="Título..." />
      <input
        type="number"
        name="amount"
        v-model="amount"
        placeholder="Valor"
        step="1"
      />
    </div>
    <button type="submit">Adicionar</button>
  </form>
  <div class="form-helper-text transactions">
    Use valores positivos para receitas e negativos para despesas.
  </div>
</template>
