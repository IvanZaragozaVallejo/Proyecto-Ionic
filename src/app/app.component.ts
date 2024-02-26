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
  ciudadesFavoritas: CiudadFavorita[] = []; // Arreglo para almacenar las ciudades favoritas
  city: string = ''; // Variable para la nueva ciudad que se va a agregar

  constructor(
    private themeService: ThemeService,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento de Ionic

    // recupera las ciudades favoritas almacenadas al iniciar la aplicaion
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
    // Verifica que la ciudad tenga un valor y no esté duplicada en la lista
    if (this.city && !this.ciudadesFavoritas.some(ciudad => ciudad.nombre === this.city)) {
      const nuevaCiudad: CiudadFavorita = { nombre: this.city };
      this.ciudadesFavoritas.push(nuevaCiudad);

      // guardar las ciudades favoritas en ionic storage
      this.storage.set('ciudadesFavoritas', this.ciudadesFavoritas);
    }
  }

  navegarAInicio(ciudad: string) {
    // Navega a la página de inicio con el nombre de la ciudad como parámetro
    this.navCtrl.navigateForward(`/inicio/${ciudad}`);
  }

  borrarCiudad(ciudad: CiudadFavorita) {
    const index = this.ciudadesFavoritas.indexOf(ciudad);
    if (index !== -1) {
      // Elimina la ciudad de la lista
      this.ciudadesFavoritas.splice(index, 1);
  
      // guardar la lista actualizada en Ionic Storage
      this.storage.set('ciudadesFavoritas', this.ciudadesFavoritas);
    }
  }
}