// spinner.ts
// Componente reutilizable de spinner de carga
import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <!-- Contenedor centrado -->
    <div class="text-center py-5">
      <!-- Spinner de Bootstrap -->
      <div class="spinner-border text-primary" role="status">
        <!-- visually-hidden: oculto visualmente pero accesible para lectores de pantalla -->
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="text-muted mt-2">Cargando...</p>
    </div>
  `
})
export class Spinner {}