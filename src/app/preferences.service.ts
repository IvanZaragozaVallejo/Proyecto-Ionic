import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  preferences = {
    unidadTemperatura: 'celsius',
    viento: 'kmh',
    precipitacion: 'mm'
  };

  constructor() { }

  savePreferences(preferences: any) {
    this.preferences = preferences;
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
  }

  loadPreferences() {
    const storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
      this.preferences = JSON.parse(storedPreferences);
    }
  }

}