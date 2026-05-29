// Ruta: src/app/features/favorites/favorites.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card'; 
import { FavoritesService } from '../../services/favorites'; // <-- Llama al archivo de arriba
import { Movie } from '../../models/movie';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCard, CommonModule,RouterLink],
  templateUrl: './favorites.html'
})
export class FavoritesComponent { 
  private favoritesService = inject(FavoritesService);

  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}