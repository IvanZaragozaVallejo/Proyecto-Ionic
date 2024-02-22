import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private favoritos: string[] = [];

  constructor() {}

  agregarFavorito(ciudad: string) {
    if (!this.favoritos.includes(ciudad)) {
      this.favoritos.push(ciudad);
    }
    this.guardarFavoritos();
  }

  obtenerFavoritos(): string[] {
    this.cargarFavoritos();
    return this.favoritos;
  }

  eliminarFavorito(ciudad: string) {
    const index = this.favoritos.indexOf(ciudad);
    if (index !== -1) {
      this.favoritos.splice(index, 1);
      this.guardarFavoritos();
    }
  }

  private cargarFavoritos() {
    const storedFavoritos = localStorage.getItem('favoritos');
    if (storedFavoritos) {
      this.favoritos = JSON.parse(storedFavoritos);
    }
  }

  private guardarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }
}
