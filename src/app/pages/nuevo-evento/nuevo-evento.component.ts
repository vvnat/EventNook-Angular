import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EventTypeForm } from '../../types/EventTypeForm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './nuevo-evento.component.html',
  styleUrl: './nuevo-evento.component.css'
})
export class NuevoEventoComponent {
  protected eventTypes: string[] = ["Bodas y comuniones", "Cenas y comidas de empresa","Congresos, conferencias y charlas", "Conciertos"];

  eventTypeForm = new FormGroup({
    name: new FormControl('')
  });

  onEventType(): void {
    const formValue = this.eventTypeForm.value;

    const form: EventTypeForm = {
      name: this.eventTypeForm.value.name ?? ''
    };
  }
}
