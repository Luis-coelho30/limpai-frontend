import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
})
export class Cadastro {
  tipo: 'voluntario' | 'empresa' | '' = '';

  onSubmit(form?: any) {
    alert('Cadastro realizado!');
    if (form) {
      console.log(form.value);
    }
  }
}
