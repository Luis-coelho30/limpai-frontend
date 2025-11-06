import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { PerfilService } from '../../perfil.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-voluntario',
  imports: [CommonModule],
  templateUrl: './perfil-voluntario.html',
  styleUrl: './perfil-voluntario.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PerfilVoluntario implements OnInit {
  data: any;
  mostrarJanelaFoto = false;
  previewFoto: string | null = null;

  constructor(private perfilService: PerfilService, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.data = this.perfilService.getDataVoluntario();
  }

  abrirJanelaFoto(){
    this.mostrarJanelaFoto = true;
  }

  fecharJanelaFoto(){
    this.mostrarJanelaFoto = false;
    this.previewFoto = null;
  }

  uploadFoto(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files[0]){
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e =>{
        this.previewFoto = e.target?.result as string;

        this.cdr.detectChanges(); //corrige bug
      };
      reader.readAsDataURL(file);
    }
  }

  salvarNovaFoto(novaUrl: string){
    this.perfilService.atualizarFoto(novaUrl);
    this.fecharJanelaFoto();
  }

  removerFoto(){
    this.perfilService.removerFoto();
    this.previewFoto = this.perfilService.getDataVoluntario().fotoPlaceholder;
    this.mostrarJanelaFoto = false;
  }

}