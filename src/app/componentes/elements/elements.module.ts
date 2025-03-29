import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PersonajeCardComponent } from './personaje-card/personaje-card.component';
import { PersonajeListComponent } from './personaje-list/personaje-list.component';
import { EpisodioListComponent } from './episodio-list/episodio-list.component';
import { EpisodioCardComponent } from './episodio-card/episodio-card.component';
import { LocalizacionCardComponent } from './localizacion-card/localizacion-card.component';
import { LocalizacionListComponent } from './localizacion-list/localizacion-list.component';



@NgModule({
  declarations: [
    PersonajeListComponent,
    PersonajeCardComponent,
    EpisodioListComponent,
    EpisodioCardComponent,
    LocalizacionCardComponent,
    LocalizacionListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    PersonajeListComponent,
    PersonajeCardComponent,
    EpisodioListComponent,
    EpisodioCardComponent,
    LocalizacionCardComponent,
    LocalizacionListComponent  
  ]
})
export class ElementsModule { }
