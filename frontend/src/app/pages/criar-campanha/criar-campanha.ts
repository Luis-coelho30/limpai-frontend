import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-criar-campanha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './criar-campanha.html',
})
export class CriarCampanha {
  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    //validações
    const data = form.value;

    const min = Number(data.minimo);
    const max = Number(data.maximo);

    if (min < 1) {
      alert('O número mínimo de voluntários deve ser pelo menos 1.');
      return;
    }

    if (max > 1000) {
      alert('O número máximo de voluntários não pode ultrapassar 1000.');
      return;
    }

    if (min > max) {
      alert('O número mínimo de voluntários não pode ser maior que o máximo.');
      return;
    }

    //validação de horário
    const [hInicio, mInicio] = data.horaInicio.split(':').map(Number);
    const [hFim, mFim] = data.horaFim.split(':').map(Number);

    const inicio = hInicio * 60 + mInicio;
    const fim = hFim * 60 + mFim;

    const duracao = fim - inicio;

    if (duracao < 120) {
      alert('A campanha deve durar pelo menos 2 horas.');
      return;
    }

    alert('Campanha salva com sucesso!');
    this.router.navigate(['/perfil-empresa']);
  }

  navegar(route: string) {
    this.router.navigate([route]);
  }
}
