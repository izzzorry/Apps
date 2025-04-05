import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { PhotoGalleryComponent } from '../elements/photo-gallery/photo-gallery.component'; // ajusta el path si está en otra carpeta

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
    PhotoGalleryComponent // este es el que te estaba faltando
  ]
})
export class Page3Page implements OnInit {
  constructor() {}
  ngOnInit() {}
}

