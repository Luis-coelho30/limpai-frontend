import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CidadeApi } from '../api/cidade.api';
import { CidadeResponse } from '../model/cidade.dto';

@Injectable({ 
    providedIn: 'root' 
})
export class CidadeService {
    private cidadeApi = inject(CidadeApi);

    buscarPorNome(cidadeNome: string): Observable<CidadeResponse[]> {
        return this.cidadeApi.buscarPorNome(cidadeNome);
    }

    listarCidadesPorEstado(estadoId: number): Observable<CidadeResponse[]> {
        return this.cidadeApi.listarCidadesPorEstado(estadoId);
    }
}