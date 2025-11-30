import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FavoritesService } from '../../services/favorites.service';
import { CacheService } from '../../services/cache.service';

@Component({ selector:'app-news-list', templateUrl:'./news-list.page.html' })
export class NewsListPage implements OnInit {
  category = 'general';
  articles: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private news: NewsService,
    private fav: FavoritesService,
    private cache: CacheService
  ) {}

  async ngOnInit() {
    const cat = this.route.snapshot.paramMap.get('category') || this.route.snapshot.params['category'];
    if (cat) this.category = cat;
    const cached = this.cache.get(`top-${this.category}`);
    if (cached) {
      this.articles = cached;
      this.loading = false;
    } else {
      const res = await this.news.getTopHeadlines(this.category);
      this.articles = res.articles || [];
      this.cache.set(`top-${this.category}`, this.articles, 30);
      this.loading = false;
    }
  }

  toggleFav(article: any) {
    if (this.fav.isFavorite(article.url)) this.fav.remove(article.url);
    else this.fav.add(article);
  }

  openDetail(article: any) {
    // navega para detail passando article como state (ou via service)
  }
}
