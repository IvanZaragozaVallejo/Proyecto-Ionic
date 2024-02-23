import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreferencesService } from '../preferences.service';

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
    private router: Router
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

    // Después de guardar las preferencias, navega de vuelta a la página de inicio
    this.router.navigate(['/inicio']);
  }

  loadPreferences() {
    this.preferencesService.loadPreferences();
    this.seleccionTemperatura = this.preferencesService.preferences.unidadTemperatura;
    this.seleccionViento = this.preferencesService.preferences.viento;
    this.seleccionPrecipitacion = this.preferencesService.preferences.precipitacion;
  }
}