import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' //torna o service disponível globalmente
  })
  export class EmpresaService {
    private readonly FOTO_KEY = 'fotoEmpresa';
    private fotoDefault!: string;//não define ainda porque dá erro de construção

    private dataEmpresa: any = {
      nomeFantasia: 'Puque Teque',
      razaoSocial: 'Liga de tecnologia da PUC-SP',
      email: 'pucteque@exemplo.com',
      telefone: '(12) 34567-8910',
      fotoPlaceholder: '', //não define ainda porque dá erro de construção
      resumo: 'Liga de tecnologia que conecta alunos da PUC-SP com o mercado',
      campanhas: [
        { id: 1, titulo: 'Limpeza de Córrego Pinheiros', tipo: 'Limpeza de rio', ano: 2023, descricao: 'blablabla' },
        { id: 2, titulo: 'Limpeza da Sala Tech', tipo: 'Limpeza de instituição', ano: 2025, descricao: 'blablabla' },
        { id: 3, titulo: 'Limpeza do Parque do Povo', tipo: 'Limpeza de parque', ano: 2024, descricao: 'blablabla' },
      ],
      estatisticas: {
        mutiroes: 24,
        lugares: 12,
        voluntarios: 184,
        lixo: 3280,
        fundos: 5400
      },
      ranking: [
        '1. Projeto Limpaí',
        '2. Limpeza do Parque do Povo',
        '3. Limpeza do Córrego Pinheiros',
        'Ver todas as empresas',
        //ideia: mostrar 3 campanhas mais recentes e um link para a lista completa
      ]
    };

    constructor(){
      this.fotoDefault = this.definirFotoDefault();
      this.dataEmpresa.fotoPlaceholder = this.fotoDefinida();
    }

    getDataEmpresa(){
      return this.dataEmpresa;
    }

    private fotoDefinida(): string {
      return localStorage.getItem(this.FOTO_KEY)
        || this.fotoDefault;
    }

    atualizarFoto(novaFoto: string) {
      this.dataEmpresa.fotoPlaceholder = novaFoto;
      localStorage.setItem(this.FOTO_KEY, novaFoto);
    }

    getIniciais(): string {
      const partes = this.dataEmpresa.nomeFantasia.trim().split(' ');
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
      this.dataEmpresa.fotoPlaceholder = this.fotoDefault;
      localStorage.setItem(this.FOTO_KEY, this.fotoDefault);
    }

  }