<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { Transaction } from '../../vanilla-app/src/types'

  const dispatch = createEventDispatcher<{
    submit: Transaction
  }>()

  // STATES
  let title = ''
  let amount = ''

  function handleSubmit() {
    dispatch('submit', {
      title,
      amount: Number(amount),
    })
    title = ''
    amount = ''
  }
</script>

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
