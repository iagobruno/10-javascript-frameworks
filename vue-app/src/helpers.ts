export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100)
}

export const initialState = [
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
