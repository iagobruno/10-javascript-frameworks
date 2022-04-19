import { createSignal } from 'solid-js'
import { Transaction } from '../../vanilla-app/src/types'

interface FormProps {
  onSubmit: (values: Transaction) => void
}

export default function Form(props: FormProps) {
  const [title, setTitle] = createSignal('')
  const [amount, setAmount] = createSignal('')

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSubmit({
      title: title(),
      amount: Number(amount()),
    })
    setTitle('')
    setAmount('')
  }

  return (
    <form id="create-transaction-form" onSubmit={handleSubmit}>
      <div class="inputs">
        <input
          type="text"
          name="title"
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          placeholder="Título..."
        />
        <input
          type="number"
          name="amount"
          value={amount()}
          onInput={(e) => setAmount(e.currentTarget.value)}
          placeholder="Valor"
          step="1"
        />
      </div>
      <button type="submit">Adicionar</button>
    </form>
  )
}
