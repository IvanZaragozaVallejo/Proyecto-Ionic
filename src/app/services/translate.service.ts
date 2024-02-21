import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTranslation(condition: string) {
    return this.httpClient.get<any>('https://api.mymemory.translated.net/get?q=' + condition + '&langpair=en|es');
  }
}
