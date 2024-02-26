// event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private configChangedSource = new Subject<void>();

  configChanged$ = this.configChangedSource.asObservable();

  triggerConfigChanged() {
    this.configChangedSource.next();
  }
}
