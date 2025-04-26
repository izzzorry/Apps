import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'page7',
  templateUrl: './page7.page.html',
  styleUrls: ['./page7.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Page7Page implements OnInit, AfterViewInit {
  lat: number = 3.3513513513513513;
  lng: number = -76.52727150815306;
  map: any;
  photoLocations: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Cargar fotos con coordenadas desde localStorage
    const storedPhotos = JSON.parse(localStorage.getItem('photosWithLocation') || '[]');
    this.photoLocations = storedPhotos.filter((photo: any) => photo.coords); // Solo las que tienen coords
    console.log('Fotos con localización:', this.photoLocations);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXp6em9ycnkiLCJhIjoiY205ZW9sdGNoMWdxZzJyb2V6N254NW02NSJ9.qKcDA3HxxSw9hxeB_hFb3w';

    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.lng, this.lat],
      zoom: 12,
      pitch: 45,
      bearing: -17.6,
      container: 'map'
    });

    this.map.on('load', () => {
      this.map.resize();

      // Insertar capa de edificios 3D
      const layers = this.map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      this.map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': .6
        }
      }, labelLayerId);

      // 🎯 Agregar un marcador por cada foto con coordenadas
      this.photoLocations.forEach((photo) => {
        if (photo.coords) {
          const marker = new mapboxgl.Marker()
            .setLngLat([photo.coords.longitude, photo.coords.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div style="text-align:center;">
                    <img src="${photo.photo}" style="width:100px; height:100px; object-fit:cover; border-radius:8px;" />
                    <p>${new Date(photo.timestamp).toLocaleString()}</p>
                  </div>
                `)
            )
            .addTo(this.map);
        }
      });
    });
  }
}
