import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { EstenderPrazoDTO } from '../../../model/campanha.dto';
import { APP_DATE_FORMATS } from '../campanha-component/campanha.component';

@Component({
  selector: 'app-estender-prazo-modal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './estender-prazo-modal.component.html',
  styleUrl: './estender-prazo-modal.component.css',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
})
export class EstenderPrazoModalComponent {
  @Input() show: boolean = false;
  @Input() errorMessage: string | null = null;
  @Input() dataFimAtual: Date | null = null; 
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EstenderPrazoDTO>();

  novaDataFim: Date | null = null;
  novaHoraFim: string = '23:59'; 


  onSubmit(form: NgForm) {
    if (form.valid && this.novaDataFim) {
      const [hours, minutes] = this.novaHoraFim.split(':');
      const dataFinal = new Date(this.novaDataFim.getTime());
      dataFinal.setHours(Number(hours));
      dataFinal.setMinutes(Number(minutes));
      dataFinal.setSeconds(0);

      const request: EstenderPrazoDTO = { novaDataFim: dataFinal.toISOString() };
      this.confirm.emit(request);
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}