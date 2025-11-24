import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-campanha-janela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campanha-janela.html',
  styleUrls: ['./campanha-janela.css']
})
export class CampanhaJanela {
  @Input() campanha: any;
  @Output() abrir = new EventEmitter<any>();
}
