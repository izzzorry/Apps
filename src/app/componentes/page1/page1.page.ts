import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { PersonajeListComponent } from '../elements/personaje-list/personaje-list.component';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
      PersonajeListComponent]
})
export class Page1Page implements OnInit {
  get personajes(): any[] {
    return this.storageService.getLocalPersonajes;
  }
    
  constructor( private storageService: StorageService ) {

  }

  ngOnInit() {
    //this.personajes = this.storageService.getLocalPersonajes;
    console.log("PER_STORAGE",this.personajes);
  }

}

