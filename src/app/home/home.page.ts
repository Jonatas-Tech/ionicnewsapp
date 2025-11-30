import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const CATEGORIES = ['general','business','entertainment','health','science','sports','technology'];

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  categories = CATEGORIES;
  constructor(private router: Router) {}
  ngOnInit() {}
  openCategory(cat: string) {
    this.router.navigate(['/news-list', { category: cat }]);
  }
}
