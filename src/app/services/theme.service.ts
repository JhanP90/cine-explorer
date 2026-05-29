// theme.service.ts
// Servicio que maneja el tema visual (claro/oscuro) con persistencia
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storage = inject(StorageService);
  private readonly KEY = 'cine-explorer-tema';

  // Tema actual (se inicializa en el constructor)
  private temaActual: string;

  constructor() {
    // Obtener el tema inicial (guardado o preferencia del sistema)
    this.temaActual = this.obtenerTemaInicial();
    // Aplicar el tema al DOM
    this.aplicarTema(this.temaActual);
  }

  // Retorna el tema actual
  obtenerTema(): string {
    return this.temaActual;
  }

  // Cambia el tema y lo persiste
  cambiarTema(tema: string): void {
    this.temaActual = tema;
    this.aplicarTema(tema);
    // Guardar en localStorage para que persista al recargar
    this.storage.set(this.KEY, tema);
  }

  // Alterna entre light y dark
  toggle(): void {
    const nuevoTema = this.temaActual === 'light' ? 'dark' : 'light';
    this.cambiarTema(nuevoTema);
  }

  // Determina el tema inicial
  private obtenerTemaInicial(): string {
    // 1. Verificar si hay tema guardado en localStorage
    const guardado = this.storage.get<string | null>(this.KEY, null);
    if (guardado) return guardado;

    // 2. Si no hay guardado, respetar la preferencia del sistema operativo
    // window.matchMedia detecta si el usuario tiene tema oscuro en su SO
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3. Por defecto: tema claro
    return 'light';
  }

  // Aplica el tema al elemento <html> del DOM
  private aplicarTema(tema: string): void {
    // setAttribute agrega data-theme="dark" o data-theme="light" al <html>
    // Los estilos CSS usan este atributo para cambiar colores
    document.documentElement.setAttribute('data-bs-theme', tema);
  }
}