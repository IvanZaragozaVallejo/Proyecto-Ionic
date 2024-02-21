import { Component, OnInit } from '@angular/core';
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

  constructor(private preferencesService: PreferencesService) {}

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
  }

  loadPreferences() {
    this.preferencesService.loadPreferences();
    this.seleccionTemperatura = this.preferencesService.preferences.unidadTemperatura;
    this.seleccionViento = this.preferencesService.preferences.viento;
    this.seleccionPrecipitacion = this.preferencesService.preferences.precipitacion;
  }
}
