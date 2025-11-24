import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  errorMessage: string | null = null; 

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = null;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        const role = this.authService.getRole();
        const rota = role === 'PATROCINADOR' ? '/perfil-empresa' : '/perfil-voluntario';
        this.router.navigate([rota]);
      },
      error: (err) => {
        this.errorMessage = 'E-mail ou senha inválidos. Tente novamente.';
        console.error('Erro no login:', err);
      }
    });
  }
}