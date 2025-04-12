// src/app/components/photo-gallery/photo-gallery.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { PhotoService } from '../../../Fotos/photo.service';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  imports: [CommonModule, IonButton, IonIcon]
})
export class PhotoGalleryComponent {
  photos: string[] = [];

  constructor(private photoService: PhotoService) {}

  async takePhoto() {
    const photo = await this.photoService.takePhoto();
    this.photos.unshift(photo); // guarda en orden descendente
  }
}
