import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CampanhaMinDTO } from '../model/campanha.dto';
import { CampanhaApi } from '../api/campanha.api';
import { PagedRequest, PagedResponse } from '../model/paged.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private campanhaApi = inject(CampanhaApi);

  listarCampanhas(request: PagedRequest): Observable<PagedResponse<CampanhaMinDTO>> {
    return this.campanhaApi.listarCampanhas(request);
  }

  listarCampanhasPorUsuario(usuarioId: number, request: PagedRequest): Observable<PagedResponse<CampanhaMinDTO>> {
    return this.campanhaApi.listarCampanhasPorUsuario(usuarioId, request);
  }
}
