import { Component, OnInit } from '@angular/core';
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
export class Page7Page implements OnInit {


 lat: number= 3.3513513513513513;
 lng: number= -76.52727150815306;


 constructor(private route: ActivatedRoute ) { }


 ngOnInit() {
    /*
   let geo: any = this.route.snapshot.paramMap.get('geo');


   geo = geo.substr(4);
   geo = geo.split(',');


   this.lat = Number(geo[0]);
   this.lng = Number(geo[1]);
   */


    console.log(this.lat, this.lng);


 }


 ngAfterViewInit() {


   mapboxgl.accessToken = 'pk.eyJ1IjoiaXp6em9ycnkiLCJhIjoiY205ZW9sdGNoMWdxZzJyb2V6N254NW02NSJ9.qKcDA3HxxSw9hxeB_hFb3w';


   const map = new mapboxgl.Map({
       style: 'mapbox://styles/mapbox/light-v9',
       center: [this.lng, this.lat],
       zoom: 15.5,
       pitch: 45,
       bearing: -17.6,
       container: 'map'
     });


     map.on('load', () => {


       map.resize();


       // Marker
       new mapboxgl.Marker()
         .setLngLat([ this.lng, this.lat ])
         .addTo(map);




       // Insert the layer beneath any symbol layer.
       const layers = map.getStyle().layers;


       let labelLayerId;
         for (let i = 0; i < layers.length; i ++) {
         if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
         labelLayerId = layers[i].id;
         break;
         }
       }


       map.addLayer({
         'id': '3d-buildings',
         'source': 'composite',
         'source-layer': 'building',
         'filter': ['==', 'extrude', 'true'],
         'type': 'fill-extrusion',
         'minzoom': 15,
         'paint': {
         'fill-extrusion-color': '#aaa',


         // use an 'interpolate' expression to add a smooth transition effect to the
         // buildings as the user zooms in
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
       });




 }






}
