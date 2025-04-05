import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickymortyServiceService } from 'src/app/services/rickymorty-service.service';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent
} from '@ionic/angular/standalone';

import { PersonajeCardComponent } from '../elements/personaje-card/personaje-card.component'; 

@Component({
  selector: 'app-page4',
  templateUrl: './page4.page.html',
  styleUrls: ['./page4.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    PersonajeCardComponent // asegúrate que también sea standalone
  ]
})
export class Page4Page implements OnInit {
  id!: number;
  personaje: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private bd: RickymortyServiceService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log("IDPERSONAJE_COMP", this.id);
      this.cargarUnPersonaje();
    });
  }

  cargarUnPersonaje() {
    this.bd.geUnPersonaje(this.id).subscribe({
      next: (results: any) => {
        this.personaje = results;
        console.log("MIPERSONAJEPAGE", this.personaje);
      },
      error: (err: any) => {
        console.error("Error al obtener el personaje:", err);
      }
    });
  }
}
