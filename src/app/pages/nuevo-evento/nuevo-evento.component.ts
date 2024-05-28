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
import { DatePipe } from '@angular/common';
import { Catering } from '../../types/Catering';
import { CateringService } from '../../services/catering.service';
import { CateringBooking } from '../../types/CateringBooking';
import { CateringBookingService } from '../../services/catering-booking.service';
import { Musician } from '../../types/Musician';
import { MusicianService } from '../../services/musician.service';
import { MusicianBooking } from '../../types/MusicianBooking';
import { MusicianBookingService } from '../../services/musician-booking.service';
import { EventService } from '../../services/event.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { User } from '../../types/User';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, FormsModule, CalendarModule, DatePipe, RouterLink],
  providers: [CookieService],
  templateUrl: './nuevo-evento.component.html',
  styleUrl: './nuevo-evento.component.css'
})
export class NuevoEventoComponent implements OnInit{

  ngOnInit(): void {
    console.log(this.userId);
  }

  cookieService: CookieService = inject(CookieService);
  userService: UserService = inject(UserService);

  user: User = JSON.parse(this.cookieService.get('user'));

  userId:number = this.user.id || 0;

  datetime24h: Date[] | undefined;

  fechaInicio: Date[] | undefined;

  spaceService: SpaceService = inject(SpaceService);
  spaceBookingService: SpaceBookingService = inject(SpaceBookingService);

  cateringBookingService: CateringBookingService = inject(CateringBookingService);
  cateringService: CateringService = inject(CateringService);

  musicianService: MusicianService = inject(MusicianService);
  musicianBookingService: MusicianBookingService = inject(MusicianBookingService);

  eventService: EventService = inject(EventService);

  selectedSpace: string = "";
  selectedCatering: string = "";
  selectedMusician: string = "";

  protected eventTypes = [
    { id: 1, name: 'Bodas y comuniones' },
    { id: 2, name: 'Comidas y cenas de empresa' },
    { id: 3, name: 'Congresos, conferencias y charlas' },
    { id: 4, name: 'Conciertos' }
  ];

  eventForm = new FormGroup({
    creatorId: new FormControl(),
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

  //spaces
  spacesByTypeAndCapacity: Space[] = [];
  reservasByDateRange: SpaceBooking[] = [];
  reservedSpacesId: number[] = [];

  //caterings
  reservasCateringsByDateRange: CateringBooking[] = [];
  caterings: Catering[] = [];
  reservedCaterings: number[] = [];

  //musicians
  musicians: Musician[] = [];
  reservasMusiciansByDateRange: MusicianBooking[] = [];
  reservedMusicians: number[] = [];

    form: EventForm = {
    creatorId: this.userId,
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


  precioTotal: number = 0;

  onEventForm(): void {
    const formValue = this.eventForm.value;

      this.form = {
      creatorId: this.userId,
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

    //recuperando espacios por rango de fecha, tipo de evento y aforo
    this.spaceBookingService.findByDateRange(this.form.startDate, this.form.endDate).subscribe(reservas => {
      this.reservasByDateRange = reservas;

      this.reservedSpacesId = this.reservasByDateRange.map(reserva => reserva.spaceId);

      this.spaceService.findByEventTypeAndCapacity(this.form.eventType, this.form.guestsNumber).subscribe(spaces => {
        this.spacesByTypeAndCapacity = spaces.filter(space => !this.reservedSpacesId.includes(space.id));
      });

    });

    //cambiando visibilidad de las secciones
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
   
    //visibilidad section
    const sectionElement2 = document.getElementById('section2');
    if (sectionElement2) {
      sectionElement2.style.display = 'none';
    }

     //recuperando caterings
     this.cateringBookingService.findByDateRange(this.form.startDate, this.form.endDate).subscribe(caterings => {
      this.reservasCateringsByDateRange = caterings;

      this.reservedCaterings = this.reservasCateringsByDateRange.map(reserva => reserva.cateringId);

      this.cateringService.findByEventType(this.form.eventType).subscribe(caterings => {
        this.caterings = caterings.filter(catering => !this.reservedCaterings.includes(catering.id));
      });
      
    });

    //visibilidad section
    const sectionElement3 = document.getElementById('section3');
    if (sectionElement3) {
      sectionElement3.style.display = 'block';
    }
  }

  cateringNotSelected(){
    this.form.cateringId = null;
    console.log(this.form);

      //visibilidad section
      const sectionElement3 = document.getElementById('section3');
      if (sectionElement3) {
        sectionElement3.style.display = 'none';
      }
  
      //recupero músicos
       this.musicianBookingService.findByDateRange(this.form.startDate, this.form.endDate).subscribe(musicians => {
        this.reservasMusiciansByDateRange = musicians;
  
        this.reservedMusicians = this.reservasMusiciansByDateRange.map(reserva => reserva.musicianId);
  
        this.musicianService.findByEventType(this.form.eventType).subscribe(musicians => {
          this.musicians = musicians.filter(musicians => !this.reservedMusicians.includes(musicians.id));
        });
        
      });
  
      //visibilidad section
      const sectionElement4 = document.getElementById('section4');
      if (sectionElement4) {
        sectionElement4.style.display = 'block';
      }
  }

  cateringSelected(cateringId: number): void {
    this.form.cateringId = cateringId;
    console.log(this.form);

    //visibilidad section
    const sectionElement3 = document.getElementById('section3');
    if (sectionElement3) {
      sectionElement3.style.display = 'none';
    }

    //recupero músicos
     this.musicianBookingService.findByDateRange(this.form.startDate, this.form.endDate).subscribe(musicians => {
      this.reservasMusiciansByDateRange = musicians;

      this.reservedMusicians = this.reservasMusiciansByDateRange.map(reserva => reserva.musicianId);

      this.musicianService.findByEventType(this.form.eventType).subscribe(musicians => {
        this.musicians = musicians.filter(musicians => !this.reservedMusicians.includes(musicians.id));
      });
      
    });

    //visibilidad section
    const sectionElement4 = document.getElementById('section4');
    if (sectionElement4) {
      sectionElement4.style.display = 'block';
    }
  }

  musicianNotSelected(){
    this.form.musicianId = null;
    console.log(this.form);

     //visibilidad section
     const sectionElement4 = document.getElementById('section4');
     if (sectionElement4) {
       sectionElement4.style.display = 'none';
     }
 
     //visibilidad section
     const sectionElement5 = document.getElementById('section5');
     if (sectionElement5) {
       sectionElement5.style.display = 'block';
     }
  
  }

  musicianSelected(musicianId: number): void {
    this.form.musicianId = musicianId;
    console.log(this.form);

    //visibilidad section
    const sectionElement4 = document.getElementById('section4');
    if (sectionElement4) {
      sectionElement4.style.display = 'none';
    }

    //visibilidad section
    const sectionElement5 = document.getElementById('section5');
    if (sectionElement5) {
      sectionElement5.style.display = 'block';
    }
  }

  onExtraServices(): void {
    this.form.open_bar = this.eventForm.value.open_bar;
    this.form.photographer = this.eventForm.value.photographer;

    console.log(this.form);

    const sectionElement5 = document.getElementById('section5');
    if (sectionElement5) {
      sectionElement5.style.display = 'none';
    }

    const sectionElement6 = document.getElementById('resumen');
    if (sectionElement6) {
      sectionElement6.style.display = 'block';
    }


    //calcular precio total
    this.spaceService.findById(this.form.spaceId || 0).subscribe(space => {
      //multiplicar por el número de días
      this.precioTotal += space.price;
    });

    if(this.form.cateringId !== null){
      this.cateringService.findById(this.form.cateringId || 0).subscribe(catering => {
        this.precioTotal += catering.price;
      });
  }

    if(this.form.musicianId !== null){
      this.musicianService.findById(this.form.musicianId || 0).subscribe(musician => {
        this.precioTotal += musician.price;
      });
    }

    if (this.form.open_bar) {
      this.precioTotal += this.form.guestsNumber * 5;
    }

    if (this.form.photographer) {
      this.precioTotal += 800;
    }

    console.log(this.form);
    
    if(this.form.spaceId !== null){
       this.selectedSpace = this.spacesByTypeAndCapacity.find(space => space.id === this.form.spaceId)?.name || "Sin espacio seleccionado";
       console.log(this.selectedSpace);
    }else{
      this.selectedSpace = "Sin espacio seleccionado";
    }

    if(this.form.cateringId !== null){
      this.selectedCatering = this.caterings.find(catering => catering.id === this.form.cateringId)?.name || "Sin catering seleccionado";
    }else{
      this.selectedCatering = "Sin catering seleccionado";
    }

    if(this.form.musicianId !== null){
      this.selectedMusician = this.musicians.find(musician => musician.id === this.form.musicianId)?.name || "Sin músico seleccionado";
    }else{
      this.selectedMusician = "Sin músico seleccionado";
    }

    console.log(this.form);

  }

  onSave(): void {
    this.eventService.create(this.form).subscribe(event => {
      console.log(event);
    });
  }
  
}
