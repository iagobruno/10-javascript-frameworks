import React, { useMemo, useState } from 'react'
import logo from './react.svg'
import type { Transaction } from '../../vanilla-app/src/types'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialState)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const { totalBalance, incomeBalance, outgoBalance } = useMemo(() => {
    let totalBalance = 0
    let incomeBalance = 0
    let outgoBalance = 0

    for (const { amount } of transactions) {
      if (amount >= 0) {
        incomeBalance += amount
      } else {
        outgoBalance += Math.abs(amount)
      }
      totalBalance += amount
    }

    return { totalBalance, incomeBalance, outgoBalance }
  }, [transactions])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const amountVal = Number(amount)
    if (amountVal === NaN) {
      return alert('Digite um número válido')
    }

    const newTransaction = {
      title,
      amount: amountVal * 100,
    }
    setTransactions([...transactions, newTransaction])
    setTitle('')
    setAmount('')
  }

  return (
    <>
      <header>
        <h1 className="app-title">Controle financeiro</h1>
        <div className="app-description">
          Feito com <img src={logo} className="logo" /> React.
        </div>
      </header>
      <section>
        <div className="user-balance">
          <div className="user-balance-title">Saldo atual</div>
          <div className="user-balance-value">
            {formatCurrency(totalBalance)}
          </div>
        </div>

        <div className="balance-report">
          <div className="income-balance">
            <div className="balance-report-title">Receitas</div>
            <div className="balance-report-value income-color">
              {formatCurrency(incomeBalance)}
            </div>
          </div>
          <div className="outgo-balance">
            <div className="balance-report-title">Despesas</div>
            <div className="balance-report-value outgo-color">
              {formatCurrency(outgoBalance)}
            </div>
          </div>
        </div>
      </section>

      <section className="transactions">
        <strong>Transações</strong>
        <ul className="transactions-list">
          {transactions.map((transaction) => {
            const isIncome = transaction.amount >= 0
            return (
              <li key={transaction.title}>
                <span>{transaction.title}</span>
                <span className={`${isIncome ? 'income' : 'outgo'}-color`}>
                  {isIncome ? '+' : '-'}{' '}
                  {formatCurrency(Math.abs(transaction.amount))}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <strong>Adicionar transação</strong>
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
        <div className="form-helper-text">
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
