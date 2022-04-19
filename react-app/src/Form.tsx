import React, { useState } from 'react'
import type { Transaction } from '../../vanilla-app/src/types'

interface FormProps {
  onSubmit: (values: Transaction) => void
}

export default function Form(props: FormProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    props.onSubmit({
      title,
      amount: Number(amount),
    })

    setTitle('')
    setAmount('')
  }

  return (
    <form id="create-transaction-form" onSubmit={handleSubmit}>
      <div className="inputs">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título..."
        />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Valor"
          step="1"
        />
      </div>
      <button type="submit">Adicionar</button>
    </form>
  )
}
