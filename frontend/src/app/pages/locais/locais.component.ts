import { ChangeDetectionStrategy, Component, OnInit, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaisCarrosselComponent } from '../components/locais-carrossel/locais-carrossel.component';

@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [CommonModule, LocaisCarrosselComponent],
  templateUrl: './locais.html',
  styleUrls: ['./locais.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocaisComponent {
}