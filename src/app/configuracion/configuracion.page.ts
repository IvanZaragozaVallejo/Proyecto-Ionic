import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  seleccionTemperatura: string;
  seleccionViento: string;
  seleccionPrecipitacion: string;
  constructor() {
    this.seleccionTemperatura = 'celsius'; //Por defecto
    this.seleccionViento = 'kmh';  //Por defecto
    this.seleccionPrecipitacion = 'mm';  //Por defecto
  }

  ngOnInit() {
  }

}
