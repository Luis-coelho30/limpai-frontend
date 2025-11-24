import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { AuthService } from '../app/service/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected readonly title = signal('landing-page');
  
  isAuthenticated = toSignal(this.authService.isAuthenticated$, { initialValue: false });

  profileLink = computed(() => {
    if (this.isAuthenticated()) {
      const role = this.authService.getRole();
      if (role === 'VOLUNTARIO') return '/perfil-voluntario';
      if (role === 'PATROCINADOR') return '/perfil-empresa';
    }
    return '/'; 
  });
  
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getButtonClasses(currentTipo: 'voluntario' | 'empresa'): string {
    const isSelected = this.formTipo() === currentTipo;
    const baseClasses = 'button-base';
    return isSelected
      ? `${baseClasses} bg-emerald-600 text-white shadow-md hover:bg-emerald-700`
      : `${baseClasses} bg-white text-gray-600 hover:bg-white/50`;
  }
}
