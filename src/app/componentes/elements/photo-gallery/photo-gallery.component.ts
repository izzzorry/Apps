import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { PhotoService } from '/Users/abelt/Documents/movilesUao/ProyetSA/proyeSA1/src/app/Fotos/photo.service';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  imports: [CommonModule, IonButton, IonIcon]
})
export class PhotoGalleryComponent implements OnInit {
  photos: { photo: string, coords?: { latitude: number, longitude: number }, timestamp: string }[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadPhotos(); // 👈 Al cargar el componente, carga las fotos del localStorage
  }

  async takePhoto() {
    try {
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

          this.photos.unshift(photoData);

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

          this.photos.unshift(photoData);

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
    } catch (err) {
      console.error('Error tomando la foto:', err);
    }
  }

  loadPhotos() {
    const storedPhotos = JSON.parse(localStorage.getItem('photosWithLocation') || '[]');
    this.photos = storedPhotos;
  }
}
