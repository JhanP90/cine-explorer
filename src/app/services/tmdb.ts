// tmdb.service.ts
// Servicio que consume la API de TMDB para obtener datos de películas
import { Injectable, inject } from '@angular/core';
// HttpClient es el cliente HTTP de Angular
import { HttpClient } from '@angular/common/http';
// Observable es el tipo de retorno de las peticiones HTTP en Angular
import { Observable } from 'rxjs';
// Importar las interfaces que creamos en el capítulo 1
import { Movie, MovieResponse, MovieDetail, Credits, Genre } from '../models/movie';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class TmdbService {
  // Inyectar HttpClient
  private http = inject(HttpClient);

  // URL base de la API de TMDB
  private apiUrl = environment.tmdbBaseUrl;
  // API key (después la moveremos a environment.ts en el capítulo 12)
  private apiKey = environment.tmdbApiKey;

  // Obtener películas populares
  // Retorna un Observable<MovieResponse> — se suscribe desde el componente
  obtenerPopulares(page: number = 1): Observable<MovieResponse> {
    // http.get<T> hace una petición GET y tipa la respuesta como T
    // params: objeto con los query parameters (?api_key=...&language=...)
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/popular`,
      {
        params: {
          api_key: this.apiKey,
          language: 'es-ES',        // respuestas en español
          page: page.toString()     // número de página (paginación)
        }
      }
    );
  }

  // Obtener películas mejor valoradas
  obtenerTopRated(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/top_rated`,
      {
        params: { api_key: this.apiKey, language: 'es-ES', page: page.toString() }
      }
    );
  }

  // Obtener detalle completo de una película por su ID
  obtenerDetalle(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.apiUrl}/movie/${id}`,
      {
        params: { api_key: this.apiKey, language: 'es-ES' }
      }
    );
  }

  // Buscar películas por texto
  buscar(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/search/movie`,
      {
        params: {
          api_key: this.apiKey,
          query: query,             // texto de búsqueda
          language: 'es-ES',
          page: page.toString()
        }
      }
    );
  }

  // Obtener créditos (reparto) de una película
  obtenerCreditos(id: number): Observable<Credits> {
    return this.http.get<Credits>(
      `${this.apiUrl}/movie/${id}/credits`,
      {
        params: { api_key: this.apiKey }
      }
    );
  }

  // Obtener lista de géneros
  obtenerGeneros(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(
      `${this.apiUrl}/genre/movie/list`,
      {
        params: { api_key: this.apiKey, language: 'es-ES' }
      }
    );
  }
}