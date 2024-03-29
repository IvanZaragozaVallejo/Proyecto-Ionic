import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ThemeService } from '../theme.service';
import { WeatherService } from '../services/weather.service';
import { CitiesService } from '../services/cities.service';
import { TranslateService } from '../services/translate.service';
import { Geolocation } from '@capacitor/geolocation';
import { PreferencesService } from '../preferences.service';
import { Storage } from '@ionic/storage-angular';
import { EventService } from '../event.service';
import { FavoritosService } from '../favoritos.service';

interface CiudadFavorita {
  nombre: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  latitude: number = 0;
  longitude: number = 0;
  city: string = '';
  condition: string = '';
  icon: string = '';
  temperature: string = '';
  humidity: string = '';
  windspeed: string = '';
  precipitations: string = '';

  tempUnits: string = 'celsius';
  windUnits: string = 'mps';
  precipUnits: string = 'in';
  ciudadesFavoritas: CiudadFavorita[] = [];

  constructor(
    private navController: NavController,
    private router: Router,
    private menuController: MenuController,
    private themeService: ThemeService,
    private weatherService: WeatherService,
    private citiesService: CitiesService,
    private translateService: TranslateService,
    private preferenceService: PreferencesService,
    private navCtrl: NavController,
    private storage: Storage,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private eventService: EventService,
    private favoritosService: FavoritosService

    
  ) {
    this.eventService.configChanged$.subscribe(() => {
      // Actualizar la pantalla aquí con los nuevos valores de configuración
      this.applyPreferences();
    });
  }

  ngOnInit() {
    this.printCurrentPosition(null);
  }

  handleSearchInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.printCurrentPosition(query);
  }

  async printCurrentPosition(query: string | null) {
    if (query !== null) {
      var location = query;

    } else {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;

      var location = this.latitude + ',' + this.longitude;

      this.citiesService.getCity(this.latitude, this.longitude).subscribe((response) => {
        this.city = response.address.city;
      });
    }

    this.weatherService.getWeather(location).subscribe((response) => {
      let weather = response;

      this.condition = weather.currentConditions.conditions;
      this.icon = weather.currentConditions.icon;
      
      if (this.tempUnits == 'celsius') {
        this.temperature = Math.round(((weather.currentConditions.temp - 32) * 5 / 9) * 100) / 100 + '°C';
      } else {
        this.temperature = weather.currentConditions.temp + '°F';
      }

      this.humidity = weather.currentConditions.humidity;

      if (this.windUnits == 'kmh') {
        this.windspeed = weather.currentConditions.windspeed + ' km/h';
      } else if (this.windUnits == 'mih') {
        this.windspeed = Math.round((weather.currentConditions.windspeed * 2.23694) * 100) / 100 + ' mi/h';
      } else {
        this.windspeed = Math.round((weather.currentConditions.windspeed / 3.6) * 100) / 100 + ' m/s';
      }

      if (this.precipUnits == 'mm') {
        this.precipitations = weather.currentConditions.precip + ' mm';
      } else {
        this.precipitations = Math.round((weather.currentConditions.precip * 0.0393701) * 100) / 100 + ' in';
      }

      if (query !== null) {
        this.city = weather.resolvedAddress;
      }

      this.translateService.getTranslation(this.condition).subscribe((response) => {
        this.condition = response.responseData.translatedText;
      });

    });
  }

  Configuracion() {
    this.navController.navigateForward(['/configuracion']);
  }

  botonFavoritos() {
    this.menuController.toggle();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  onSearch(event: CustomEvent) {
    const searchTerm = event.detail.value;
    console.log('Búsqueda:', searchTerm);
  }

  // Método para guardar una ciudad en la lista de ciudades favoritas
  guardarCiudad() {
    // Crear un objeto CiudadFavorita con el nombre proporcionado
    const nuevaCiudad: CiudadFavorita = { nombre: this.city };
  
    // Obtener la lista actual de ciudades favoritas almacenadas en el almacenamiento
    this.storage.get('ciudadesFavoritas').then((ciudadesGuardadas: CiudadFavorita[] | null) => {
      // Si no hay ciudades guardadas, inicializa la lista como un array vacío
      const ciudades = ciudadesGuardadas || [];
    
      // Verificar si la ciudad actual ya está en la lista de ciudades favoritas      
      if (!ciudades.some(ciudad => ciudad.nombre === this.city)) {
        // Si la ciudad no está en la lista, agrégala
        ciudades.push(nuevaCiudad);
         
        // Guardar la lista actualizada de ciudades favoritas en el almacenamiento
        this.storage.set('ciudadesFavoritas', ciudades).then(() => {
        
          // Forzar la actualización de la vista en la zona Angular y realizar otras operaciones después de guardar
          this.ngZone.run(() => {
            this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios en Angular
            this.favoritosService.actualizarCiudadesFavoritas(); // Actualizar ciudades favoritas en algún servicio
          });
        });
      }
    });
  }
  
  ionViewWillEnter() {
    this.preferenceService.loadPreferences();
    this.applyPreferences();
  }

  applyPreferences() {
    const preferences = this.preferenceService.getPreferences();
    
    this.tempUnits = preferences.unidadTemperatura;
    this.windUnits = preferences.viento;
    this.precipUnits = preferences.precipitacion;
    
    // Actualizar la pantalla con los nuevos valores de configuración
    this.printCurrentPosition(null);
  }
}  