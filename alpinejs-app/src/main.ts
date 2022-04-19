import Alpine from 'alpinejs'
import './style.css'
import type { Transaction } from '../../vanilla-app/src/types'

Alpine.data('app_state', () => ({
  transactions: [],
  totalBalance: 0,
  incomeBalance: 0,
  outgoBalance: 0,

  addTransaction(transaction: Transaction) {
    this.transactions = [...this.transactions, transaction]
    this.updateBalances()
  },

  updateBalances() {
    let totalBalance = 0
    let incomeBalance = 0
    let outgoBalance = 0

    for (const { amount } of this.transactions) {
      const isIncome = amount >= 0
      if (isIncome) {
        incomeBalance += amount
      } else {
        outgoBalance += Math.abs(amount)
      }
      totalBalance += amount
    }

    this.totalBalance = totalBalance
    this.incomeBalance = incomeBalance
    this.outgoBalance = outgoBalance
  },

  init() {
    initialState.forEach(this.addTransaction.bind(this))
  },
}))

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100)
}
// @ts-ignore
window.formatCurrency = formatCurrency

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

Alpine.start()
