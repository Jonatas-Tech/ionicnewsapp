import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private KEY = 'ionicnews_cache';

  set(key: string, data: any, ttlMin = 30) {
    const obj = { ts: Date.now(), ttlMin, data };
    localStorage.setItem(`${this.KEY}_${key}`, JSON.stringify(obj));
  }

  get(key: string) {
    const raw = localStorage.getItem(`${this.KEY}_${key}`);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const ageMin = (Date.now() - obj.ts) / 1000 / 60;
    if (ageMin > obj.ttlMin) {
      localStorage.removeItem(`${this.KEY}_${key}`);
      return null;
    }
    return obj.data;
  }
}
