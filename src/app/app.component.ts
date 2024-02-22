import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

interface CiudadFavorita {
  nombre: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  ciudadesFavoritas: CiudadFavorita[] = [];
  city: string = '';

  constructor(
    private themeService: ThemeService,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    this.storage.get('ciudadesFavoritas').then((ciudades: CiudadFavorita[] | null) => {
      this.ciudadesFavoritas = ciudades || [];
    });

    this.themeService.themeChanged.subscribe(darkMode => {
      if (darkMode) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
    });
  }

  guardarCiudad() {
    if (!this.ciudadesFavoritas.some(ciudad => ciudad.nombre === this.city)) {
      const nuevaCiudad: CiudadFavorita = { nombre: this.city };
      this.ciudadesFavoritas.push(nuevaCiudad);

      this.storage.set('ciudadesFavoritas', this.ciudadesFavoritas);
    }
  }

  navegarAInicio(ciudad: string) {
    this.navCtrl.navigateForward(`/inicio/${ciudad}`);
  }
}
