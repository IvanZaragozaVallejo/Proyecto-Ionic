import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private preferences = {
    unidadTemperatura: 'celsius',
    viento: 'kmh',
    precipitacion: 'mm'
  };

  constructor(private storage: Storage) { }

  async savePreferences(preferences: any) {
    this.preferences = preferences;
    await this.storage.set('preferences', this.preferences);
  }

  async loadPreferences() {
    const storedPreferences = await this.storage.get('preferences');
    this.preferences = storedPreferences || this.preferences;
  }

  getPreferences() {
    return { ...this.preferences };
  }
}
