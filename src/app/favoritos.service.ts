import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private ciudadesFavoritasSubject = new Subject<void>();

  ciudadesFavoritas$(): Observable<void> {
    return this.ciudadesFavoritasSubject.asObservable();
  }

  actualizarCiudadesFavoritas() {
    this.ciudadesFavoritasSubject.next();
  }
}
