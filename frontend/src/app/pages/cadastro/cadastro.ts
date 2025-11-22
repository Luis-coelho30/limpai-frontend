import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import {
  RegisterVoluntarioRequest,
  RegisterPatrocinadorRequest
} from '../../model/auth.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  imports: [CommonModule, FormsModule]
})
export class Cadastro {
  // controle do tipo de cadastro (voluntario | empresa)
  tipo: 'voluntario' | 'empresa' = 'voluntario';

  // campos comuns
  nome = '';
  email = '';
  senha = '';
  telefone = '';

  // voluntário
  cpf = '';
  dataNascimento = '';

  // empresa
  razaoSocial = '';
  nomeFantasia = '';
  cnpj = '';

  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  private onlyDigits(v: string): string {
    return (v || '').replace(/\D/g, '');
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidDate(dateStr: string): boolean {
    if (!dateStr) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  }

  private isValidCPF(cpf: string): boolean {
    const s = this.onlyDigits(cpf);
    if (s.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(s)) return false;
    const nums = s.split('').map(n => parseInt(n, 10));
    const calc = (len: number) => {
      let sum = 0;
      for (let i = 0; i < len; i++) sum += nums[i] * (len + 1 - i);
      const res = (sum * 10) % 11;
      return res === 10 ? 0 : res;
    };
    return calc(9) === nums[9] && calc(10) === nums[10];
  }

  private isValidCNPJ(cnpj: string): boolean {
    const s = this.onlyDigits(cnpj);
    return s.length === 14 && !/^(\d)\1{13}$/.test(s);
  }

  private isValidPhone(phone: string): boolean {
    const d = this.onlyDigits(phone);
    return d.length === 0 || d.length === 10 || d.length === 11; 
  }

  onSubmit(): void {
    this.error = '';

    if (!this.email || !this.isValidEmail(this.email)) { this.error = 'Email inválido.'; return; }
    if (!this.senha || this.senha.length < 6) { this.error = 'Senha deve ter ao menos 6 caracteres.'; return; }
    if (!this.isValidPhone(this.telefone)) { this.error = 'Telefone inválido.'; return; }

    if (this.tipo === 'voluntario') {
      if (!this.nome.trim()) { this.error = 'Nome obrigatório.'; return; }
      if (!this.dataNascimento || !this.isValidDate(this.dataNascimento)) { this.error = 'Data de nascimento inválida.'; return; }
      if (!this.cpf || !this.isValidCPF(this.cpf)) { this.error = 'CPF inválido.'; return; }

      const payload: RegisterVoluntarioRequest = {
        nome: this.nome.trim(),
        email: this.email.trim(),
        senha: this.senha,
        cpf: this.onlyDigits(this.cpf),
        dataNascimento: this.dataNascimento,
        telefone: (this.telefone || '').trim()
      };

      this.loading = true;
      this.auth.cadastrarVoluntario(payload)
        .pipe(take(1), finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            const token = this.auth.getToken();
            if (token) this.router.navigate(['/feed-campanhas']);
            else this.router.navigate(['/login']);
          },
          error: err => {
            this.error = err?.error?.message || err?.message || 'Erro ao cadastrar voluntário';
          }
        });
    } else {
      // empresa
      if (!this.razaoSocial.trim()) { this.error = 'Razão social obrigatória.'; return; }
      if (!this.nomeFantasia.trim()) { this.error = 'Nome fantasia obrigatório.'; return; }
      if (!this.cnpj || !this.isValidCNPJ(this.cnpj)) { this.error = 'CNPJ inválido.'; return; }

      const payload: RegisterPatrocinadorRequest = {
        razaoSocial: this.razaoSocial.trim(),
        nomeFantasia: this.nomeFantasia.trim(),
        cnpj: this.onlyDigits(this.cnpj),
        email: this.email.trim(),
        senha: this.senha,
        telefone: (this.telefone || '').trim()
      };

      this.loading = true;
      this.auth.cadastrarPatrocinador(payload)
        .pipe(take(1), finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            const token = this.auth.getToken();
            if (token) this.router.navigate(['/feed-campanhas']);
            else this.router.navigate(['/login']);
          },
          error: err => {
            this.error = err?.error?.message || err?.message || 'Erro ao cadastrar empresa';
          }
        });
    }
  }
}
