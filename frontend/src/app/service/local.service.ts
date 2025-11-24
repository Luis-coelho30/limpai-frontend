import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LocalApi } from '../api/local.api';
import {
    LocalRequest,
    LocalResponse
} from '../model/local.dto';
import { PagedRequest, PagedResponse } from '../model/paged.model';

@Injectable({ 
    providedIn: 'root' 
})
export class LocalService {
    private localApi = inject(LocalApi);
    
    listarLocais(request: PagedRequest): Observable<PagedResponse<LocalResponse>>{
        return this.localApi.listarLocais(request);
    }

    buscarPorId(localId: number): Observable<LocalResponse | null> {
        return this.localApi.buscarPorId(localId).pipe(
            catchError(error => { 
                if (error.status === 404) {
                    return of(null); 
                } else {
                    throw error;  
                } 
            })
        );
    }

    criarLocal(request: LocalRequest): Observable<LocalResponse> {
        return this.localApi.criarLocal(request);
    }

    atualizarLocal(localId: number, request: LocalRequest): Observable<LocalResponse | null> {
        return this.localApi.atualizarLocal(localId, request).pipe(
            catchError(error => { 
                if (error.status === 404) {
                    return of(null); 
                } else {
                    throw error;  
                } 
            })
        );
    }
}