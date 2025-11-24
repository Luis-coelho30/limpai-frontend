import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from '../../service/perfil.service';
import { PatrocinadorDTO } from '../../model/patrocinador.dto';
import { FeedCampanhasCriadasComponent } from '../components/feed-campanhas-criadas/feed-campanhas-criadas.component';
import { FeedInscricaoComponent } from '../components/feed-inscricao/feed-inscricao.component';

@Component({
  selector: 'app-perfil-empresa',
  imports: [CommonModule, RouterModule, FeedCampanhasCriadasComponent, FeedInscricaoComponent],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class PerfilEmpresa implements OnInit {
  private perfilService = inject(PerfilService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  
  perfil = signal<PatrocinadorDTO | null>(null);
  mostrarJanelaFoto = false;
  previewFoto: string | null = null;

  // Accordion state
  showCampanhasCriadas = signal(true);
  showInscricoes = signal(false);

  ngOnInit() {
    this.perfilService.buscarPerfil().subscribe(data => {
      this.perfil.set(data as PatrocinadorDTO);
    });
  }

  get fotoExibida(): string {
    return 'assets/foto-limpai.png';
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

  navegar(route: string) {
    this.router.navigate([route]);
  }
}
