import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';

import { RickymortyServiceService } from 'src/app/services/rickymorty-service.service';
import { firstValueFrom } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { localizacionListComponent } from '../elements/localizacion-list/localizacion-list.component';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    localizacionListComponent
  ]
})
export class Page2Page implements OnInit {

  lugares: any[] = [];
  lugaresTemp: any[] = [];
  url_next: string | null = 'https://rickandmortyapi.com/api/location';
  cargando = false;

  titulo1: string = 'Localizaciones';
  subtitulo1: string = 'de Ricky & Morty';

  constructor(private bd: RickymortyServiceService) {}

  ngOnInit() {
    this.cargarLugares(this.url_next!);
  }

  async cargarLugares(url: string) {
    if (this.cargando) return;

    this.cargando = true;
    try {
      const resp: any = await firstValueFrom(this.bd.getLugaresPorURL(url));
      if (resp) {
        this.lugaresTemp = resp.results;
        this.url_next = resp.info.next;

        await this.cargarResidentesParaLugares();

        this.lugares.push(...this.lugaresTemp);
      }
    } catch (error) {
      console.error("Error obteniendo lugares:", error);
    } finally {
      this.cargando = false;
    }
  }

  async cargarResidentesParaLugares() {
    for (let lugar of this.lugaresTemp) {
      const residentsPromises = lugar.residents.map((url: string) =>
        this.obtenerDetallePersonaje(url)
      );
      const residents = await Promise.all(residentsPromises);
      lugar.residents = residents; // reemplaza las URLs por los objetos
    }

    console.log('Lugares con personajes resueltos:', this.lugaresTemp);
  }

  async obtenerDetallePersonaje(url: string) {
    try {
      const response: any = await firstValueFrom(this.bd.getCharacterDetails(url));
      return response;
    } catch (error) {
      console.error('Error cargando personaje desde URL:', error);
      return {};
    }
  }

  async onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.url_next !== null && !this.cargando) {
      await this.cargarLugares(this.url_next);
    }
    event.target.complete();
  }
}
