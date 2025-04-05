// src/app/components/photo-gallery/photo-gallery.component.ts
import { Component } from '@angular/core';
import { PhotoService } from '../../../Fotos/photo.service';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon]
})
export class PhotoGalleryComponent {
  photos: string[] = [];

  constructor(private photoService: PhotoService) { }

  // Llamar al servicio para tomar una foto
  public async takePhoto() {
    const photo = await this.photoService.takePhoto();
    this.photos.push(photo);  // Agregar la foto a la galería
  }
}

