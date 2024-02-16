import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private router: Router,
    private menuController: MenuController
  ) { }

  ngOnInit() {
  }

  Configuracion(){
    this.router.navigate(['/configuracion']);
  }

  botonFavoritos(){
    this.menuController.toggle();
  }

}
