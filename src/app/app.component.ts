import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Inicialmente, verifica el estado actual del modo oscuro y aplica la clase correspondiente al body
    this.updateDarkModeClass(this.themeService.isDarkMode());

    // Escucha los cambios en el modo oscuro y actualiza la clase del body en consecuencia
    this.themeService.themeChanged.subscribe((darkMode: boolean) => {
      this.updateDarkModeClass(darkMode);
    });
  }

  private updateDarkModeClass(darkMode: boolean) {
    const ionContentElements = document.querySelectorAll('ion-content');
    if (darkMode) {
      document.body.classList.add('dark-theme');
      ionContentElements.forEach(element => {
        element.classList.add('dark-theme');
      });
    } else {
      document.body.classList.remove('dark-theme');
      ionContentElements.forEach(element => {
        element.classList.remove('dark-theme');
      });
    }
  }
  
}
