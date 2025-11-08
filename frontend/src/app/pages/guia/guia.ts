import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guia.html',
})
export class Guia {
  topicos = [
    {
      titulo: 'Como criar uma campanha',
      descricao: 'Aprenda o passo a passo para cadastrar novas campanhas.',
      conteudo: '1. Vá até o perfil da sua empresa.\n2. Clique em "Criar nova campanha".\n3. Preencha as informações obrigatórias.\n4. Clique em "Salvar" para concluir.'
    },
    {
      titulo: 'Como se inscrever em uma campanha',
      descricao: 'Veja como dar o primeiro passo em direção à uma boa causa.',
      conteudo: '1. Acesse a aba "Campanhas".\n2. Veja as opções disponíveis.\n3. Ao abrir uma campanha, aperte o botão "Inscrever-se".\n4. Preencha suas informações e clique em "Salvar" para concluir.'
    },
    {
      titulo: 'Como visualizar estatísticas',
      descricao: 'Acompanhe os resultados e impacto de suas campanhas.',
      conteudo: 'As páginas de perfil de empresas contêm a seção "Estatísticas e Rankings"'
    }
  ];

  topicoSelecionado: any = null;

  abrirPopup(topico: any) {
    this.topicoSelecionado = topico;
  }

  fecharPopup() {
    this.topicoSelecionado = null;
  }
}
