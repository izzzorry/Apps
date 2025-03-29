import { Component, OnInit,EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  //triangle, ellipse, square,
  videocam,
  people,home,cart,star} from 'ionicons/icons';

@Component({
  selector: 'app-localizacion-card',
  templateUrl: './localizacion-card.component.html',
  styleUrls: ['./localizacion-card.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],

  standalone:true
})
export class LocalizacionCardComponent  implements OnInit {

  public environmentInjector = inject(EnvironmentInjector);

  constructor() {addIcons({
    //triangle, ellipse, square,
    videocam,
    people,home,cart,star });
}

  ngOnInit() {}

}
