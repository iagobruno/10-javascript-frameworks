import { createEffect, For } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { Transaction } from '../../vanilla-app/src/types'
import Form from './Form'

export default function App() {
  const [state, setState] = createStore({
    transactions: initialState as Transaction[],
    totalBalance: 0,
    incomeBalance: 0,
    outgoBalance: 0,
  })

  createEffect(() => {
    let totalBalance = 0
    let incomeBalance = 0
    let outgoBalance = 0

    for (const { amount } of state.transactions) {
      if (amount >= 0) {
        incomeBalance += amount
      } else {
        outgoBalance += Math.abs(amount)
      }
      totalBalance += amount
    }

    setState({ totalBalance, incomeBalance, outgoBalance })
  })

  function addTransaction({ title, amount }: Transaction) {
    if (amount === NaN) {
      return alert('Digite um número válido')
    }

    const newTransaction = {
      title,
      amount: amount * 100,
    }
    setState('transactions', [...state.transactions, newTransaction])
  }

  return (
    <>
      <header>
        <h1 class="app-title">Controle financeiro</h1>
        <div class="app-description">
          Feito com <img src="/solid.svg" class="logo" /> SolidJS.
        </div>
      </header>
      <section>
        <div class="user-balance">
          <div class="user-balance-title">Saldo atual</div>
          <div class="user-balance-value">
            {formatCurrency(state.totalBalance)}
          </div>
        </div>

        <div class="balance-report">
          <div class="income-balance">
            <div class="balance-report-title">Receitas</div>
            <div class="balance-report-value income-color">
              {formatCurrency(state.incomeBalance)}
            </div>
          </div>
          <div class="outgo-balance">
            <div class="balance-report-title">Despesas</div>
            <div class="balance-report-value outgo-color">
              {formatCurrency(state.outgoBalance)}
            </div>
          </div>
        </div>
      </section>

      <section class="transactions">
        <strong>Transações</strong>
        <ul class="transactions-list">
          <For each={state.transactions}>
            {(transaction) => {
              const isIncome = transaction.amount >= 0
              return (
                <li>
                  <span>{transaction.title}</span>
                  <span class={`${isIncome ? 'income' : 'outgo'}-color`}>
                    {isIncome ? '+' : '-'}{' '}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </li>
              )
            }}
          </For>
        </ul>
      </section>

      <section>
        <strong>Adicionar transação</strong>
        <Form onSubmit={addTransaction} />
        <div class="form-helper-text">
          Use valores positivos para receitas e negativos para despesas.
        </div>
      </section>
    </>
  )
}

const initialState = [
  {
    title: 'Salário',
    amount: 2_500_00,
  },
  {
    title: 'Aluguel',
    amount: -400_00,
  },
  {
    title: 'Mercado',
    amount: -800_00,
  },
  {
    title: 'Entretenimento',
    amount: -100_00,
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100)
}
