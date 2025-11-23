import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EstenderPrazoDTO } from '../../../model/campanha.dto';

@Component({
  selector: 'app-estender-prazo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estender-prazo-modal.component.html',
  styleUrl: './estender-prazo-modal.component.css'
})
export class EstenderPrazoModalComponent {
  @Input() show: boolean = false;
  @Input() errorMessage: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EstenderPrazoDTO>();

  novaDataFim: string | null = null;

  onSubmit(form: NgForm) {
    if (form.valid && this.novaDataFim) {
      this.confirm.emit({ novaDataFim: this.novaDataFim });
      this.novaDataFim = null; 
      form.resetForm();
    }
  }
}