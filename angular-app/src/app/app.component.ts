import { Component, Input, SimpleChanges } from '@angular/core';
import type { Transaction } from '../../../vanilla-app/src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() transactions: Transaction[] = initialState;
  @Input() totalBalance = 0;
  @Input() incomeBalance = 0;
  @Input() outgoBalance = 0;

  math = Math;

  ngOnInit() {
    this.updateBalances();
  }

  addTransaction() {
    const newTransaction = {
      title: 'M',
      amount: -100_00,
    };
    this.transactions = [...this.transactions, newTransaction];
    this.updateBalances();
  }

  updateBalances() {
    let totalBalance = 0;
    let incomeBalance = 0;
    let outgoBalance = 0;

    for (const { amount } of this.transactions) {
      if (amount >= 0) {
        incomeBalance += amount;
      } else {
        outgoBalance += Math.abs(amount);
      }
      totalBalance += amount;
    }

    this.totalBalance = totalBalance;
    this.incomeBalance = incomeBalance;
    this.outgoBalance = outgoBalance;
  }

  formatCurrency(amount: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount / 100);
  }
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
];
