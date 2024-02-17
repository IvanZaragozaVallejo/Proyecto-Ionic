import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  seleccionUnidadTemperatura: string;
  seleccionLenguage: string;
  constructor() { 
    this.seleccionUnidadTemperatura = 'celsius'; //Por defecto
    this.seleccionLenguage = 'spanish';  //Por defecto  
  }

  ngOnInit() {
  }

}
