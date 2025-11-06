import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  private campanhaSelecionada = new BehaviorSubject<any | null>(null);
  campanha$ = this.campanhaSelecionada.asObservable();

  abrirJanela(campanha: any) {
    this.campanhaSelecionada.next(campanha);
  }

  fecharJanela() {
    this.campanhaSelecionada.next(null);
  }
}
