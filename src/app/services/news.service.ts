import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NewsService {
  base = environment.newsApiUrl;

  async getTopHeadlines(category = 'general', page = 1) {
    const res = await axios.get(`${this.base}/top-headlines`, {
      params: { category, page, pageSize: 20 },
    });
    return res.data;
  }

  async search(q: string, page = 1) {
    const res = await axios.get(`${this.base}/everything`, {
      params: { q, page, pageSize: 20 },
    });
    return res.data;
  }
}
