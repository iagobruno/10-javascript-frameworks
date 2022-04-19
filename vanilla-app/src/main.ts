import './style.css'
import type { Transaction } from './types'

const app = document.querySelector<HTMLDivElement>('#app')!
const userBalanceElement = document.querySelector('.user-balance-value')!
const incomeBalanceElement = document.querySelector(
  '.income-balance .balance-report-value'
)!
const outgoBalanceElement = document.querySelector(
  '.outgo-balance .balance-report-value'
)!
const transactionsListElement = document.querySelector('ul.transactions-list')!
const formElement = document.querySelector<HTMLFormElement>('form')!

const transactions: Transaction[] = []

function addTransaction(transaction: Transaction) {
  transactions.push(transaction)

  updateBalances()

  const el = document.createElement('li')
  const isIncome = transaction.amount >= 0
  const className = isIncome ? 'income' : 'outgo'
  const symbol = isIncome ? '+' : '-'
  el.innerHTML = `
    <span>${transaction.title}</span>
    <span class="${className}-color">
      ${symbol} ${formatCurrency(Math.abs(transaction.amount))}
    </span>
  `
  transactionsListElement!.append(el)
}

function updateBalances() {
  let totalBalance = 0
  let incomeBalance = 0
  let outgoBalance = 0

  for (const { amount } of transactions) {
    const isIncome = amount >= 0
    if (isIncome) {
      incomeBalance += amount
    } else {
      outgoBalance += Math.abs(amount)
    }
    totalBalance += amount
  }

  userBalanceElement!.textContent = formatCurrency(totalBalance)
  incomeBalanceElement!.textContent = formatCurrency(incomeBalance)
  outgoBalanceElement!.textContent = formatCurrency(outgoBalance)
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100)
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = Object.fromEntries(
    // @ts-ignore
    new FormData(formElement)
  )

  const amount = Number(formData.amount)
  if (amount === NaN) {
    return alert('Digite um número válido')
  }

  addTransaction({
    amount: amount * 100,
    title: formData.title,
  })

  formElement.reset()
})

addTransaction({
  title: 'Salário',
  amount: 2_500_00,
})
addTransaction({
  title: 'Aluguel',
  amount: -400_00,
})
addTransaction({
  title: 'Mercado',
  amount: -800_00,
})
addTransaction({
  title: 'Entretenimento',
  amount: -100_00,
})
