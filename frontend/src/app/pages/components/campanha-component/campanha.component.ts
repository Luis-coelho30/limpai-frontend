import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, NativeDateAdapter, DateAdapter } from '@angular/material/core';
import { CampanhaDTO, CriarCampanhaDTO } from '../../../model/campanha.dto';
import { TempoRestantePipe } from '../../../pipes/tempo-restante.pipe';

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Component({
  selector: 'app-campanha-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TempoRestantePipe,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  templateUrl: './campanha.component.html',
  styleUrl: './campanha.component.css',
})
export class CampanhaComponent implements OnInit, OnChanges {
  @Input() campanha: CampanhaDTO | null = null;
  @Input() mode: 'view' | 'create' | 'edit' = 'view';
  @Input() canManage: boolean = false; 
  @Input() isSubscribed: boolean = false;
  @Input() initialLocalId: number | null = null;
  @Input() initialLocalNome: string | null = null;
  
  @Output() save = new EventEmitter<CriarCampanhaDTO>();
  @Output() cancel = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() endCampaign = new EventEmitter<number>();
  @Output() extendDeadline = new EventEmitter<number>();
  @Output() signUp = new EventEmitter<void>();
  @Output() donate = new EventEmitter<number>();

  dataInicioDate: Date | null = null;
  dataInicioTime: string = '09:00';
  dataFimDate: Date | null = null;
  dataFimTime: string = '18:00';

  formData: CriarCampanhaDTO = {
    nome: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    metaFundos: 0,
    localId: 0
  };

  get isEncerrada(): boolean {
    if (!this.campanha?.dataFim) return false;
    return new Date(this.campanha.dataFim) < new Date();
  }

  ngOnInit(): void {
    if (this.mode === 'create' && this.initialLocalId) {
      this.formData.localId = this.initialLocalId;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['campanha'] && this.campanha && this.mode === 'edit') {
      this.formData = {
        nome: this.campanha.nome,
        descricao: this.campanha.descricao,
        metaFundos: this.campanha.metaFundos,
        localId: this.campanha.localDTO.localId,
        dataInicio: '',
        dataFim: '',
      };
      this.splitDateTime(this.campanha.dataInicio, 'inicio');
      this.splitDateTime(this.campanha.dataFim, 'fim');
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const dataInicioCompleta = this.combineDateTime(this.dataInicioDate, this.dataInicioTime);
      const dataFimCompleta = this.combineDateTime(this.dataFimDate, this.dataFimTime);

      if (!dataInicioCompleta || !dataFimCompleta) {
        alert('Por favor, preencha as datas e horas de início e fim.');
        return;
      }

      const payload: CriarCampanhaDTO = {
        ...this.formData,
        dataInicio: dataInicioCompleta,
        dataFim: dataFimCompleta,
      };
      this.save.emit(payload);
    }
  }

  private combineDateTime(date: Date | null, time: string): string | null {
    if (!date || !time) return null;

    const pad = (num: number) => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}T${time}:00`;
  }

  private splitDateTime(isoString: string, type: 'inicio' | 'fim') {
    const date = new Date(isoString);
    const time = isoString.substring(11, 16);

    if (type === 'inicio') {
      this.dataInicioDate = date;
      this.dataInicioTime = time;
    } else {
      this.dataFimDate = date;
      this.dataFimTime = time;
    }
  }
}
