import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('landing-page');
  
  //quero que apareça um outerlink para o perfil do usuário no lugar dos outerlinks login e cadastro quando ele fizer login
  view = signal<'cadastro' | 'perfil'>('cadastro');
  formTipo = signal<'voluntario' | 'empresa'>('voluntario');
  data = signal<any | null>(null);

  setTipo(novoTipo: 'voluntario' | 'empresa'): void {
    this.formTipo.set(novoTipo);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log(`Dados de Cadastro (${this.formTipo()}):`, form.value);
      this.view.set('perfil');
    } else {
      console.error('Formulário inválido');
    }
  }

  logout(): void {
    this.view.set('cadastro');
  }
/*
  simularLogin(): void {
    const perfil = PerfilService.getData();
    this.data.set(perfil);
    this.view.set('perfil');
  } */
 //o que falta: chamar página de perfil (após entrar na conta)

  getButtonClasses(currentTipo: 'voluntario' | 'empresa'): string {
    const isSelected = this.formTipo() === currentTipo;
    const baseClasses = 'button-base';
    return isSelected
      ? `${baseClasses} bg-emerald-600 text-white shadow-md hover:bg-emerald-700`
      : `${baseClasses} bg-white text-gray-600 hover:bg-white/50`;
  }
}
