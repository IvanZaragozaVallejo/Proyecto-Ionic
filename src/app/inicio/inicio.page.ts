import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ThemeService } from '../theme.service';
import { WeatherService } from '../services/weather.service';
import { CitiesService } from '../services/cities.service';
import { TranslateService } from '../services/translate.service';
import { Geolocation } from '@capacitor/geolocation';
import { PreferencesService } from '../preferences.service';
import { Storage } from '@ionic/storage-angular';

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
    private storage: Storage
  ) { }

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

      this.guardarCiudad();
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

  guardarCiudad() {
    const nuevaCiudad: CiudadFavorita = { nombre: this.city };
    this.ciudadesFavoritas.push(nuevaCiudad);
    this.storage.set('ciudadesFavoritas', this.ciudadesFavoritas);
  }

  ionViewWillEnter() {
    this.preferenceService.loadPreferences();
    this.applyPreferences();
  }

  applyPreferences() {
    this.tempUnits = this.preferenceService.preferences.unidadTemperatura;
    this.windUnits = this.preferenceService.preferences.viento;
    this.precipUnits = this.preferenceService.preferences.precipitacion;
  }

}
