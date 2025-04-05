import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMAGE_EPISODES } from '../config/image.service';
import { URL_RM } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class RickymortyServiceService {
  personajes: any[] = [];

  constructor(private http: HttpClient) {}

  getAllPersonajes(): Observable<any> {
    const url = `${URL_RM}/character`;
    return this.http.get(url).pipe(
      map(res => {
        console.log('PERSONAJES_RK', res);
        return res;
      })
    );
  }

  getMasPersonajes(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map(res => {
        console.log('PERSONAJES_RK', res);
        return res;
      })
    );
  }

  getListaPersonajes(unaLista: string): Observable<any> {
    return this.http.get(`${URL_RM}/character/${unaLista}`);
  }

  geUnPersonaje(unId: number): Observable<any> {
    return this.http.get(`${URL_RM}/character/${unId}`).pipe(
      map(res => {
        console.log('PERSONAJE_RK', res);
        return res;
      })
    );
  }

  geUnPersonajeUrl(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map(res => {
        console.log('PERSONAJE_RK', res);
        return res;
      })
    );
  }

  getPersonajePorURL(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error(`Error obteniendo personaje desde ${url}:`, error);
        return of(null);
      })
    );
  }

  getEpisodios(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((res: any) => {
        const episodios = res.results;

        episodios.forEach((episode: any) => {
          let listaPersonajes = episode.characters
            .map((p: string) => p.split('/').pop())
            .join(',');
          console.log("LISTA PERSONAJES", listaPersonajes);
        });

        return res;
      })
    );
  }

  getEpisodio(unEpisodio: number): Observable<any> {
    return this.http.get(`${URL_RM}/episode/${unEpisodio}`).pipe(
      map(res => {
        console.log('EPISODIO', res);
        return res;
      })
    );
  }

  getCharacterDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getImageEpisodes(list: number[]): string[] {
    return list
      .map(id => IMAGE_EPISODES.episodes.find(ep => ep.id === id))
      .filter(ep => ep)
      .map(ep => ep!.image);
  }

  getImageEpisode(unEpisodio: number): any {
    const data = IMAGE_EPISODES.episodes.find(ep => ep.id === unEpisodio);
    console.log(data);
    return data;
  }

  getLugaresPorURL(url: string): any {
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('LUGARES', res);
        
        return res;
      })
    );
  }
}
