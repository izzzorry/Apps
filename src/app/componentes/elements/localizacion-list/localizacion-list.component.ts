import { Component, Input, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/angular/standalone';
import { PersonajeListComponent } from '../personaje-list/personaje-list.component';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { people } from 'ionicons/icons';

@Component({
  selector: 'app-localizacion-list',
  templateUrl: './localizacion-list.component.html',
  styleUrls: ['./localizacion-list.component.scss'],
  imports: [
    IonList, IonItem, IonLabel, IonIcon,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonThumbnail, IonAccordion, IonAccordionGroup,
    PersonajeListComponent
  ],
  standalone: true
})
export class localizacionListComponent implements OnInit {
  @Input() locations: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  titulo1: string = 'Habitantes';
  subtitulo1: string = 'Ricky & Morty';

  constructor(private router: Router) {
    addIcons({ people });
  }

  ngOnInit() { }

  verLocation(id: number) {
    console.log('Location', id);
    this.router.navigate(['/location-detail', id]);
  }
}
