import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private navController: NavController,
    private router: Router,
    private menuController: MenuController,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
  }

  Configuracion(){
    this.navController.navigateForward(['/configuracion']);
  }

  botonFavoritos(){
    this.menuController.toggle();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

}
