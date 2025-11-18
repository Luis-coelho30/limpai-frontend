import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' //torna o service disponível globalmente
  })
  export class PerfilService {
    private readonly FOTO_KEY = 'fotoVoluntario';
    private fotoDefault!: string; //não define ainda porque dá erro de construção

    private dataVoluntario: any = {
      nome: 'Gilberto Schnackenburg Peixeira',
      titulo: 'Especialista em Soft Skills',
      email: 'gilbertosp@exemplo.com',
      telefone: '(10) 98765-4321',
      fotoPlaceholder: '', //não define ainda porque dá erro de construção
      resumo: 'Voluntário dedicado com experiência em gestão de projetos sociais e paixão por causas ambientais e front-end. Busco oportunidades para aplicar minhas habilidades em comunicação e organização para impactar positivamente a comunidade.',
      certificados: [
        { id: 1, titulo: 'Especialista em Soft Skills', instituicao: 'Instituto XYZ', ano: 2023 },
        { id: 2, titulo: 'Design para Computação', instituicao: 'PUCSP', ano: 2022 },
        { id: 3, titulo: 'CLT', instituicao: 'Empresa ABC', ano: 2024 },
      ],
      habilidades: ['Comunicação Interpessoal', 'Liderança de Equipes', 'Organização de Eventos', 'Coleta de Fundos']
    };

    constructor(){
      this.fotoDefault = this.definirFotoDefault();
      this.dataVoluntario.fotoPlaceholder = this.fotoDefinida();
    }
    
    getDataVoluntario(){
      return this.dataVoluntario;
    }

    private fotoDefinida(): string {
      return localStorage.getItem(this.FOTO_KEY)
        || this.fotoDefault;
    }

    atualizarFoto(novaFoto: string) {
      this.dataVoluntario.fotoPlaceholder = novaFoto;
      localStorage.setItem(this.FOTO_KEY, novaFoto);
    }

    getInitials(nome: string){
      const parts = nome.trim().split(" ").filter(Boolean);
      const first = parts[0]?.[0] || "";
      const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
      return (first + last).toUpperCase();
    }

    getIniciais(): string {
      const partes = this.dataVoluntario.nome.trim().split(' ');
      const primeira = partes[0]?.[0] || '';
      const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
      return (primeira + ultima).toUpperCase();
    }

    definirFotoDefault() {
      const iniciais = this.getIniciais();
      const foto = `https://placehold.co/100x100/10b981/ffffff/png?text=${iniciais}`;
      return foto;
    }

    removerFoto() {
       this.dataVoluntario.fotoPlaceholder = this.fotoDefault;
      localStorage.setItem(this.FOTO_KEY, this.fotoDefault)
    }

    
    
  }
    