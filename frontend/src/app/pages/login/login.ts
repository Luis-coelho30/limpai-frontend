import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true
})
export class Login {
  // variável que controla qual botão está ativo
  botaoAtivo: 'empresa' | 'voluntario' = 'empresa'; 

  // função para selecionar botão
  selecionarBotao(tipo: 'empresa' | 'voluntario') {
    this.botaoAtivo = tipo;
  }
}
