import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;
  public themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  toggleDarkMode(){
    this.darkMode = !this.darkMode;
    this.themeChanged.emit(this.darkMode);
  }
  isDarkMode(){
    return this.darkMode;
  }
}
