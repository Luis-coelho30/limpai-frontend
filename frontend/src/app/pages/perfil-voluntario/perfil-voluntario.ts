import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, inject, signal } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { CommonModule } from '@angular/common';
import { VoluntarioDTO } from '../../model/voluntario.dto';
import { FeedInscricaoComponent } from '../components/feed-inscricao/feed-inscricao.component';

@Component({
  selector: 'app-perfil-voluntario',
  imports: [CommonModule, FeedInscricaoComponent],
  templateUrl: './perfil-voluntario.html',
  styleUrl: './perfil-voluntario.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PerfilVoluntario implements OnInit {
  private perfilService = inject(PerfilService);
  private cdr = inject(ChangeDetectorRef);
  
  perfil = signal<VoluntarioDTO | null>(null);
  mostrarJanelaFoto = false;
  previewFoto: string | null = null;

  ngOnInit() {
    this.perfilService.buscarPerfil().subscribe(data => {
      this.perfil.set(data as VoluntarioDTO);
    });
  }

  get fotoExibida(): string {
    return this.gerarFotoPlaceholder();
  }

  gerarFotoPlaceholder(): string {
    const nome = this.perfil()?.nome ?? '';
    const iniciais = nome.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    return `https://placehold.co/100x100/10b981/ffffff/png?text=${iniciais}`;
  }

  abrirJanelaFoto() {
    this.mostrarJanelaFoto = true;
  }

  fecharJanelaFoto() {
    this.mostrarJanelaFoto = false;
    this.previewFoto = null;
  }

  uploadFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.previewFoto = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  salvarNovaFoto(novaUrl: string) { /* TODO: Implementar upload */ }
  removerFoto() { /* TODO: Implementar remoção */ }
}