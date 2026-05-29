// storage.service.ts
// Servicio wrapper para localStorage con manejo de errores y tipado genérico
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  // Obtener un valor de localStorage con tipado genérico
  // T es el tipo esperado del dato (Movie[], string, boolean, etc.)
  // key: clave con la que se guardó el dato
  // defaultValue: valor por defecto si no existe o hay error
  get<T>(key: string, defaultValue: T): T {
    try {
      // localStorage.getItem retorna string o null
      const data = localStorage.getItem(key);
      // Si existe, parsear el JSON. Si no, retornar el valor por defecto
      // JSON.parse puede fallar si el dato está corrupto
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      // Si JSON.parse falla, retornar el valor por defecto
      return defaultValue;
    }
  }

  // Guardar un valor en localStorage
  // JSON.stringify convierte cualquier objeto a string
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Puede fallar si localStorage está lleno (~5MB)
      console.error('Error al guardar en localStorage:', error);
    }
  }

  // Eliminar un valor
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo localStorage
  clear(): void {
    localStorage.clear();
  }
}

