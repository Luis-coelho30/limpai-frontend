import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DoacaoDTO } from '../../../model/campanha.dto';

@Component({
  selector: 'app-doacao-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doacao-modal.component.html',
  styleUrl: './doacao-modal.component.css'
})
export class DoacaoModalComponent {
  @Input() show: boolean = false;
  @Input() errorMessage: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<DoacaoDTO>();

  valor: number | null = null;

  onSubmit(form: NgForm) {
    if (form.valid && this.valor) {
      this.confirm.emit({ valor: this.valor });
      this.valor = null; 
      form.resetForm();
    }
  }
}