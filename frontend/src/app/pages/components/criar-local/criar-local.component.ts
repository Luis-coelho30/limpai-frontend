import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CidadeService } from '../../../service/cidade.service'; 
import { CidadeResponse } from '../../../model/cidade.dto'; 
import { LocalService } from '../../../service/local.service';

@Component({
  selector: 'app-criar-local',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-local.html',
})
export class CriarLocalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cidadeService = inject(CidadeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private localService = inject(LocalService);

  localForm!: FormGroup;
  cidadesSugeridas = signal<CidadeResponse[]>([]);

  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'error'>('success');
  returnUrl: string | null = null;


  ngOnInit(): void {
    this.localForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', Validators.required],
      cidadeId: [null, Validators.required], 
      cidadeNome: ['', Validators.required] 
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || null;
    this.escutarBuscaDeCidade();
  }

  private escutarBuscaDeCidade(): void {
    this.localForm.get('cidadeNome')!.valueChanges.pipe(
      // Aguarda 300ms apos o usuario parar de digitar
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term && term.length > 2),
      switchMap(term => this.cidadeService.buscarPorNome(term))
    ).subscribe(cidades => {
      this.cidadesSugeridas.set(cidades);
    });
  }

  selecionarCidade(cidade: CidadeResponse): void {
    this.localForm.patchValue({
      cidadeId: cidade.cidadeId,
      cidadeNome: `${cidade.nome} - ${cidade.estadoSigla}`
    });
    this.cidadesSugeridas.set([]);
  }

  private displayToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
  
  handleCancel(): void {
    this.router.navigateByUrl(this.returnUrl || '/locais');
  }

  onSubmit(): void {
    if (this.localForm.valid) {
      const formValue = { ...this.localForm.value };
      delete formValue.cidadeNome;

      this.localForm.disable();

      this.localService.criarLocal(formValue).subscribe({
        next: (localCriado) => {
          this.displayToast('Área de Ação criada com sucesso!', 'success');
          this.localForm.reset();
          // A navegação deve ocorrer após o sucesso da operação
          this.router.navigateByUrl(this.returnUrl || '/locais');
        },
        error: (err) => this.displayToast('Erro ao criar Área de Ação. Tente novamente.', 'error'),
        complete: () => this.localForm.enable() 
      });
    }
  }
}
