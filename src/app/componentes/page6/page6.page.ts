import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-page6',
  templateUrl: 'page6.page.html',
  styleUrls: ['page6.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class Page6Page {
  latitude: number | null = null;
  longitude: number | null = null;

  async getCurrentLocation(): Promise<void> {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log('Latitud:', this.latitude);
      console.log('Longitud:', this.longitude);
    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
    }
  }
}
