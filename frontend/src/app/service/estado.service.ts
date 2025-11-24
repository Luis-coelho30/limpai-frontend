import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoApi } from '../api/estado.api';
import { EstadoResponse } from '../model/estado.dto';

@Injectable({ 
    providedIn: 'root' 
})
export class EstadoService {
    private estadoApi = inject(EstadoApi);
    
    listarEstados(): Observable<EstadoResponse[]>{
        return this.estadoApi.listarEstados();
    }
}