import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EventForm } from '../../types/EventForm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Space } from '../../types/Space';
import { SpaceService } from '../../services/space.service';
import { SpaceBookingService } from '../../services/space-booking.service';
import { SpaceBooking } from '../../types/SpaceBooking';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, FormsModule, CalendarModule],
  templateUrl: './nuevo-evento.component.html',
  styleUrl: './nuevo-evento.component.css'
})
export class NuevoEventoComponent {

  datetime24h: Date[] | undefined;

  fechaInicio: Date[] | undefined;

  spaceService: SpaceService = inject(SpaceService);
  spaceBookingService: SpaceBookingService = inject(SpaceBookingService);

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
    photographer: new FormControl(),
  });

  spacesByTypeAndCapacity: Space[] = [];
  reservasByDateRange: SpaceBooking[] = [];
  reservedSpacesId: number[] = [];

    form: EventForm = {
    eventType: 0,
    startDate: new Date(),
    endDate: new Date(),
    spaceId: null,
    restaurantId: null,
    cateringId: null,
    musicianId: null,
    open_bar: false,
    guestsNumber: 0,
    photographer: false
  }

  onEventForm(): void {
    const formValue = this.eventForm.value;

      this.form = {
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
    

    console.log(this.form);

    this.spaceBookingService.findByDateRange(this.form.startDate, this.form.endDate).subscribe(reservas => {
      this.reservasByDateRange = reservas;
    });

    this.reservedSpacesId = this.reservasByDateRange.map(reserva => reserva.spaceId);

    this.spaceService.findByEventTypeAndCapacity(this.form.eventType, this.form.guestsNumber).subscribe(spaces => {
      this.spacesByTypeAndCapacity = spaces.filter(space => !this.reservedSpacesId.includes(space.id));
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

  spaceSelected(spaceId:number): void {
    this.form.spaceId = spaceId;
    console.log(this.form);
    //aquí meteré alguna animación para transicionar a la siguiente sección

    const sectionElement2 = document.getElementById('section2');
    if (sectionElement2) {
      sectionElement2.style.display = 'none';
    }

  }
}
