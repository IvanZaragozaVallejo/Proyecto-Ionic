import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Set<string> = new Set();

  constructor() {}

  addFavorite(city: string): void {
    if (!this.favorites.has(city)) {
      this.favorites.add(city);
      this.saveFavorites();
    }
  }

  getFavorites(): string[] {
    this.loadFavorites();
    return Array.from(this.favorites);
  }

  removeFavorite(city: string): void {
    if (this.favorites.has(city)) {
      this.favorites.delete(city);
      this.saveFavorites();
    }
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = new Set(JSON.parse(storedFavorites));
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }
}