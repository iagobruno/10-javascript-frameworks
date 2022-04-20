import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css'],
})
export class AppFormComponent {
  title = '';
  amount = '';

  handleSubmit() {
    console.log('SUBMIT!');
  }
}
