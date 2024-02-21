import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  private urlParams = '?key=W6D4NL7SRK6ETWF2MAFQ3D6ST&contentType=json'

  constructor(
    private httpClient: HttpClient
  ) { }

  getWeather(location:string){
    return this.httpClient.get<any>(this.baseUrl + location + this.urlParams);
  }
}
