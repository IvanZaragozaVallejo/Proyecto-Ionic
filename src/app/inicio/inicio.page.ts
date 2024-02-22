import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ThemeService } from '../theme.service';
import { WeatherService } from '../services/weather.service';
import { CitiesService } from '../services/cities.service';
import { TranslateService } from '../services/translate.service';
import { Geolocation } from '@capacitor/geolocation';
import { PreferencesService } from '../preferences.service';
import { FavoritoService } from '../favorito.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  providers: [FavoritoService]
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

  tempUnits: string = 'farenheit';
  windUnits: string = 'mps';
  precipUnits: string = 'in';

  constructor(
    private navController: NavController,
    private router: Router,
    private menuController: MenuController,
    private themeService: ThemeService,
    private weatherService: WeatherService,
    private citiesService: CitiesService,
    private translateService: TranslateService,
    private preferenceService: PreferencesService,
    private favoritoService: FavoritoService
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

      var location = this.latitude + ',' + this.longitude

      // Esta api no es muy fiable así que se usa solo para mostrar el nombre
      // pero el tiempo se obtiene por coordenadas para mayor fiabilidad
      this.citiesService.getCity(this.latitude, this.longitude).subscribe((response) => {
        this.city = response.address.city;
      });
      
    }

    this.weatherService.getWeather(location).subscribe((response) => {
      let weather = response
      //console.log(weather);

      this.condition = weather.currentConditions.conditions;
      this.icon = weather.currentConditions.icon;

      if (this.tempUnits == 'celsius') {
        this.temperature = weather.currentConditions.temp + '°C';
      } else {
        this.temperature = Math.round((weather.currentConditions.temp * 9 / 5 + 32) * 100) / 100 + '°F';
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

  onSearch(event:CustomEvent) {
    const searchTerm = event.detail.value;
    console.log('Búsqueda:', searchTerm);
  }

  guardarCiudad() {
    const ciudadActual = this.city;
  
    const ciudadGuardada = {
      city: ciudadActual
    };
    const jsonData = JSON.stringify(ciudadGuardada);
    localStorage.setItem('weatherData', jsonData);
  
    this.favoritoService.agregarFavorito(ciudadActual);
  
    console.log('Información guardada y agregada a favoritos');
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
