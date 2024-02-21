import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCity(latitude: number, longitude: number) {
    return this.httpClient.get<any>('https://eu1.locationiq.com/v1/reverse?lat=' + latitude + '&lon=' + longitude + '&format=json&key=pk.33c883d260fd2d2b39c7020d5aa2efc3');

  }
}
