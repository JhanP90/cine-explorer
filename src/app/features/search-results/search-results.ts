// search-results.ts
// Página que muestra resultados de búsqueda leyendo el query param "q"
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { FavoritesService } from '../../services/favorites';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './search-results.html'
})
export class SearchResults implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);

  resultados: Movie[] = [];
  termino: string = '';
  cargando: boolean = false;

  ngOnInit(): void {
    // queryParams es un Observable que emite cuando los params cambian
    // Así si el usuario busca algo nuevo, se actualiza automáticamente
    this.route.queryParams.subscribe(params => {
      this.termino = params['q'] || '';
      if (this.termino) {
        this.buscar(this.termino);
      }
    });
  }

  buscar(termino: string): void {
    this.cargando = true;
    this.tmdbService.buscar(termino).subscribe({
      next: (response) => {
        this.resultados = response.results;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}