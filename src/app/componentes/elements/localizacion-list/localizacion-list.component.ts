import { Component, EnvironmentInjector, inject,OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  //triangle, ellipse, square,
  videocam,
  people,home,cart,star} from 'ionicons/icons';



@Component({
  selector: 'app-localizacion-list',
  templateUrl: './localizacion-list.component.html',
  styleUrls: ['./localizacion-list.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  standalone:true
})
export class LocalizacionListComponent  implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  constructor() { 
    addIcons({
      //triangle, ellipse, square,
      videocam,
      people,home,cart,star })
  }

  ngOnInit() {}

}
