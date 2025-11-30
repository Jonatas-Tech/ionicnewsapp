import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private KEY = 'ionicnews_favorites';

  getAll(): any[] {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  }

  add(article: any) {
    const arr = this.getAll();
    if (!arr.find(a => a.url === article.url)) {
      arr.unshift(article);
      localStorage.setItem(this.KEY, JSON.stringify(arr));
    }
  }

  remove(url: string) {
    const arr = this.getAll().filter(a => a.url !== url);
    localStorage.setItem(this.KEY, JSON.stringify(arr));
  }

  isFavorite(url: string) {
    return this.getAll().some(a => a.url === url);
  }
}
