import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EventForm } from '../../types/EventForm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Space } from '../../types/Space';
import { SpaceService } from '../../services/space.service';


@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './nuevo-evento.component.html',
  styleUrl: './nuevo-evento.component.css'
})
export class NuevoEventoComponent {
  spaceService: SpaceService = inject(SpaceService);

  protected eventTypes = [
    { id: 1, name: 'Bodas y comuniones' },
    { id: 2, name: 'Comidas y cenas de empresa' },
    { id: 3, name: 'Congresos, conferencias y charlas' },
    { id: 4, name: 'Conciertos' }
  ];

  eventForm = new FormGroup({
    eventType: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    spaceId: new FormControl(),
    restaurantId: new FormControl(),
    cateringId: new FormControl(),
    musicianId: new FormControl(),
    open_bar: new FormControl(),
    guestsNumber: new FormControl(),
    photographer: new FormControl()
  });

  spacesByTypeAndCapacity: Space[] = [];

  onEventForm(): void {
    const formValue = this.eventForm.value;

    const form: EventForm = {
      eventType: formValue.eventType,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      guestsNumber: formValue.guestsNumber,
      spaceId: null,
      restaurantId: null,
      cateringId: null,
      musicianId: null,
      open_bar: false,
      photographer: false
    };

    console.log(form);

    this.spaceService.findByEventTypeAndCapacity(form.eventType, form.guestsNumber).subscribe(spaces => {
      this.spacesByTypeAndCapacity = spaces;
    });

    const sectionElement = document.getElementById('sectionForm');
    if (sectionElement) {
      sectionElement.style.display = 'none';
    }

    const sectionElement2 = document.getElementById('section2');
    if (sectionElement2) {
      sectionElement2.style.display = 'block';
    }
  }

  onSpace(): void {
    const seleccionarButton = document.getElementById('seleccionarButton');

    if (seleccionarButton){
      seleccionarButton.classList.add('seleccionarButton');
    }
  }

  spaceSelected(spaceId:number): void {
    console.log(spaceId);
  }
}