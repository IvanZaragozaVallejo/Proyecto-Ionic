import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreferencesService } from '../preferences.service';
import { EventService } from '../event.service';
import { Storage } from '@ionic/storage-angular'; 

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  seleccionTemperatura: string = 'celsius';
  seleccionViento: string = 'kmh';
  seleccionPrecipitacion: string = 'mm';

  constructor(
    private preferencesService: PreferencesService,
    private eventService: EventService, 
    private router: Router,
    private storage: Storage 
  ) {}

  ngOnInit() {
    this.loadPreferences();
  }

  savePreferences() {
    const preferences = {
      unidadTemperatura: this.seleccionTemperatura,
      viento: this.seleccionViento,
      precipitacion: this.seleccionPrecipitacion
    };
  
    this.preferencesService.savePreferences(preferences);
  
    // Guardar las preferencias actualizadas en Ionic Storage
    this.storage.set('preferences', preferences).then(() => {
      // Después de guardar las preferencias, notificar el cambio utilizando el servicio de eventos
      this.eventService.triggerConfigChanged();
  
      // Navegar de vuelta a la página de inicio
      this.router.navigate(['/inicio']);
    });
  }

  loadPreferences() {
    // Cargar preferencias desde Ionic Storage al inicio
    this.storage.get('preferences').then((storedPreferences) => {
      if (storedPreferences) {
        this.seleccionTemperatura = storedPreferences.unidadTemperatura;
        this.seleccionViento = storedPreferences.viento;
        this.seleccionPrecipitacion = storedPreferences.precipitacion;
      }
    });
  }
}