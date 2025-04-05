import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonButton,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  arrowBack,
  arrowForward,
  cashOutline,
  list,
  images,
  closeCircle,
  people,
  locationOutline,
} from 'ionicons/icons';

import { PersonajeListComponent } from '../personaje-list/personaje-list.component';
import { SwiperSlidesComponent } from '../swiper-slides/swiper-slides.component';
import { FotosPersonajesPipe } from '../../../pipes/fotos-personajes.pipe';

@Component({
  selector: 'app-localizacion-card',
  templateUrl: './localizacion-card.component.html',
  styleUrls: ['./localizacion-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonLabel,
    IonIcon,
    IonItem,
    IonButton,
    IonToolbar,
    IonButtons,
    CommonModule,
    PersonajeListComponent,
    SwiperSlidesComponent,
    FotosPersonajesPipe,
  ],
})
export class LocalizacionCardComponent implements OnInit {
  @Input() localizacion: any;
  @Input() personajes: any[] = [];

  titulo1: string = 'Residentes';
  subtitulo1: string = 'Universo Rick & Morty';

  tipoVista: string = 'lista';
  mensajeVista: string = 'Lista de personajes';

  constructor() {
    addIcons({
      calendarOutline,
      arrowBack,
      arrowForward,
      cashOutline,
      list,
      images,
      closeCircle,
      people,
      locationOutline,
    });
  }

  ngOnInit() {}

  changeView(anType: string) {
    if (anType === 'lista') {
      this.tipoVista = 'lista';
      this.mensajeVista = 'Lista de personajes';
    }

    if (anType === 'imagen') {
      this.tipoVista = 'imagen';
      this.mensajeVista = 'Galería de personajes';
    }

    if (anType === 'nada') {
      this.tipoVista = 'nada';
      this.mensajeVista = 'Sin vista activa';
    }
  }
}
