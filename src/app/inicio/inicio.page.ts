import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private router: Router,
    private menuController: MenuController,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
  }

  Configuracion(){
    this.router.navigate(['/configuracion']);
  }

  botonFavoritos(){
    this.menuController.toggle();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

}
