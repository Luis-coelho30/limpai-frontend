import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempoRestante',
  standalone: true,
  pure: false 
})
export class TempoRestantePipe implements PipeTransform {

  transform(dataFim: string | Date | null): string {
    if (!dataFim) {
      return 'Data indefinida';
    }

    const dataFinal = new Date(dataFim);
    const agora = new Date();

    const diffMs = dataFinal.getTime() - agora.getTime();

    if (diffMs <= 0) {
      return 'Campanha encerrada';
    }

    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let resultado = '';
    if (dias > 0) {
      resultado += `${dias}d `;
    }
    if (horas > 0 || dias > 0) { 
      resultado += `${horas}h `;
    }
    resultado += `${minutos}m`;

    return resultado.trim();
  }

}