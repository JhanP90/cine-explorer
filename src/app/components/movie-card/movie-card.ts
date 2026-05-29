// movie-card.ts
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
// Importar los pipes personalizados
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image.pipe';
import { StarsPipe } from '../../shared/pipes/stars.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  // Agregar los pipes a imports para usarlos en el template
  imports: [RouterLink, TruncatePipe, TmdbImagePipe, StarsPipe],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCard {
  movie = input.required<Movie>();
  esFavorita = input<boolean>(false);
  toggleFavorito = output<Movie>();

  onToggleFavorito(): void {
    this.toggleFavorito.emit(this.movie());
  }
}