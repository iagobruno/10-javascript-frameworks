import { Component, Event, EventEmitter, h, State } from '@stencil/core';
import type { Transaction } from '../../../../vanilla-app/src/types';

@Component({
  tag: 'app-form',
  styleUrl: 'app-form.css',
  shadow: true,
})
export class AppForm {
  @State() title = '';
  @State() amount = '';

  @Event() submit: EventEmitter<Transaction>;

  handleSubmit(event: Event) {
    event.preventDefault();
    this.submit.emit({
      title: this.title,
      amount: Number(this.amount),
    });
    this.title = '';
    this.amount = '';
  }

  render() {
    return (
      <div>
        <form id="create-transaction-form" onSubmit={this.handleSubmit.bind(this)}>
          <div class="inputs">
            <input type="text" name="title" placeholder="Título..." value={this.title} onInput={e => (this.title = (e.currentTarget as HTMLInputElement).value)} />
            <input type="number" name="amount" placeholder="Valor" step="1" value={this.amount} onInput={e => (this.amount = (e.currentTarget as HTMLInputElement).value)} />
          </div>
          <button type="submit">Adicionar</button>
        </form>
        <div class="form-helper-text">Use valores positivos para receitas e negativos para despesas.</div>
      </div>
    );
  }
}
