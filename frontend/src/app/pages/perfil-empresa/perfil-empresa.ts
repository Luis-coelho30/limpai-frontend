import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { EmpresaService } from '../../service/empresa.service';
import { CommonModule } from '@angular/common';
import { CampanhaJanela } from '../components/campanha-janela/campanha-janela';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-empresa',
  imports: [CommonModule, CampanhaJanela, RouterModule],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})

export class PerfilEmpresa implements OnInit {
  data: any;
  campanhaSelecionada: any = null;
  mostrarTodas = false;
  estavaMostrandoTodas = false;
  mostrarJanelaFoto = false;
  previewFoto: string | null = null;

  constructor(private empresaService: EmpresaService, private cdr: ChangeDetectorRef, private router: Router){}

  ngOnInit(){
    this.data = this.empresaService.getDataEmpresa();
  }

  abrirDetalhes(campanha: any){
    //lógica para lidar com as janelas pop-up de campanhas
    this.estavaMostrandoTodas = this.mostrarTodas;
    this.mostrarTodas = false;
    this.campanhaSelecionada = campanha;
  }

  fecharPopup(){
    //fecha um pop-up de campanha individual
    this.campanhaSelecionada = null;

    //reabre pop-up de todas as campanhas se estava aberto antes
    if (this.estavaMostrandoTodas){
      this.mostrarTodas = true;
      this.estavaMostrandoTodas = false;
    }
  }

  abrirTodas(){
    this.mostrarTodas = true;
  }

  fecharTodas(){
    this.mostrarTodas = false;
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

  salvarNovaFoto(novaUrl: string) {
    this.empresaService.atualizarFoto(novaUrl);
    this.fecharJanelaFoto();
  }

  removerFoto(){
    this.empresaService.removerFoto();
    this.previewFoto = this.empresaService.getDataEmpresa().fotoPlaceholder;
    this.mostrarJanelaFoto = false;
  }

  navegar(route: string){
    this.router.navigate([route]);
  }
}
