import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonButtons, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { arrowBack, arrowForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';

Swiper.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-swiper-slides',
  templateUrl: './swiper-slides.component.html',
  styleUrls: ['./swiper-slides.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonTitle,
    IonButton,
    IonButtons,
    IonToolbar,
    IonIcon
  ]
})
export class SwiperSlidesComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() titulo: string = 'Imágenes';

  swiper?: Swiper;

  constructor() {
    addIcons({ arrowBack, arrowForward });
  }

  ngOnInit() {
    // Mostrar Swiper solo si hay imágenes
    if (this.images.length < 1) return;

    const shouldLoop = this.images.length > 2;

    this.swiper = new Swiper('.swiper-container', {
      loop: shouldLoop,
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext();
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev();
  }
}
