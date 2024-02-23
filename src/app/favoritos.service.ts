import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private eventService: EventService) { 
    this.eventService.ciudadGuardada$.subscribe(() => {
      // Lógica para actualizar la vista en la pestaña de favoritos
      this.cargarCiudadesFavoritas();
    });
  }
  cargarCiudadesFavoritas() {
    // Lógica para cargar la lista de ciudades favoritas
  }
}
