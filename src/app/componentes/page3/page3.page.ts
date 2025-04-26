import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton,  IonFab,   IonIcon, AlertController } from '@ionic/angular/standalone';
import { PhotoService } from '/Users/abelt/Documents/movilesUao/ProyetSA/proyeSA1/src/app/Fotos/photo.service';
import { PhotoGalleryComponent } from '../elements/photo-gallery/photo-gallery.component';
import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { addIcons } from 'ionicons';
import { scan } from 'ionicons/icons';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFab,  
    IonFabButton,
    IonIcon,
    PhotoGalleryComponent
  ]
})
export class Page3Page implements OnInit {
  barcodes: Barcode[] = [];

  constructor(
    private photoService: PhotoService,
    private alertController: AlertController // Necesario para mostrar alertas
  ) {

    addIcons({ scan });
  }

  ngOnInit() {}

  // Función para tomar foto y guardar ubicación
  async takePhoto() {
    const photo = await this.photoService.takePhoto();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        const photoData = {
          photo,
          coords,
          timestamp: new Date().toISOString()
        };

        const storedPhotos = JSON.parse(localStorage.getItem('photosWithLocation') || '[]');
        storedPhotos.unshift(photoData);
        localStorage.setItem('photosWithLocation', JSON.stringify(storedPhotos));
      },
      (error) => {
        console.error('Error al obtener la ubicación', error);

        const photoData = {
          photo,
          timestamp: new Date().toISOString()
        };

        const storedPhotos = JSON.parse(localStorage.getItem('photosWithLocation') || '[]');
        storedPhotos.unshift(photoData);
        localStorage.setItem('photosWithLocation', JSON.stringify(storedPhotos));
      },
      {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 0
      }
    );
  }

  // Función para escanear QR
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    console.log('Códigos escaneados:', this.barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Debes conceder permiso de cámara para usar el escáner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
