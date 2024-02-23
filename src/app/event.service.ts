import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private ciudadGuardadaSubject = new Subject<void>();

  ciudadGuardada$ = this.ciudadGuardadaSubject.asObservable();

  triggerCiudadGuardada() {
    this.ciudadGuardadaSubject.next();
  }
}
