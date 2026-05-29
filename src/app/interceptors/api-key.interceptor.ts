// api-key.interceptor.ts
// Interceptor que agrega la API key a todas las peticiones a TMDB
// Así no hay que pasarla manualmente en cada método del servicio
import { HttpInterceptorFn } from '@angular/common/http';

// HttpInterceptorFn es el tipo para interceptores funcionales (Angular 15+)
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo modificar peticiones a TMDB (no a otras APIs)
  if (req.url.includes('api.themoviedb.org')) {
    // clone() crea una copia de la petición (las peticiones son inmutables)
    // setParams agrega parámetros a la URL
    const clonedReq = req.clone({
      setParams: {
        api_key: 'cd81a482b7663ee9dc170485ef4985fb'  // después mover a environment.ts
      }
    });
    // next() envía la petición modificada al servidor
    return next(clonedReq);
  }

  // Si no es TMDB, enviar la petición sin modificar
  return next(req);
};