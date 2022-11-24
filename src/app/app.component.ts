/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { DbService } from './services/db/db.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  TITLE = 'AppComponent';
  all_pages: any = [];
  theme: any = 'dark';

  isTaskbarActive = false;
  language: any = 'en';
  time: any = '00:00 AM';
  date: any = '23-Nov-2022';

  constructor(
    public db: DbService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.TITLE}#constructor]`);

    const lastPage = this.db.get('last_page');
    console.log(console.log(`[${this.TITLE}#constructor] lastPage`, lastPage));

    if (lastPage == null) {
      this.redirectTo(this.db.get('base_url'), this.TITLE);
    } else {
      this.redirectTo(lastPage, this.TITLE);
    }

    this.router.config.forEach((route) => {
      if (route.path != '**') {
        this.all_pages.push(route.path);
      }
    });
    console.log(`[${this.TITLE}#toggleTaskbar] all_pages`, this.all_pages);

    this.language = this.db.get('language') || 'en';
    console.log(`[${this.TITLE}#toggleTaskbar] language`, this.language);

    console.log(`[${this.TITLE}#toggleTaskbar] time`, this.time);
    console.log(`[${this.TITLE}#toggleTaskbar] date`, this.date);

    console.log(`[${this.TITLE}#toggleTaskbar] isTaskbarActive`, this.isTaskbarActive);

    this.loadTheme();
  }

  ngOnInit(): void {
    console.log(`[${this.TITLE}#ngOnInit]`);

    window.onload = () => this.rainbowMatrix(25);
    window.onresize = () => this.rainbowMatrix(25);
  }

  toggleTheme(): void {
    // console.log(`[${this.title}#toggleTheme]`);
    console.log(`[${this.TITLE}#toggleTheme] theme`, this.theme);

    if (this.theme == 'light') {
      //? dark theme
      this.theme = 'dark';
      this.db.set('theme', 'dark');
      document.body.setAttribute('theme', this.db.get('theme'));
    } else {
      //? light theme
      this.theme = 'light';
      this.db.set('theme', 'light');
      document.body.setAttribute('theme', this.db.get('theme'));
    }

    this.updateView(this.TITLE);
  }

  loadTheme(): void {
    // console.log(`[${this.title}#loadTheme]`);

    this.theme = this.db.get('theme') || 'dark';
    console.log(`[${this.TITLE}#loadTheme] theme`, this.theme);

    document.body.setAttribute('theme', this.theme);

    this.updateView(this.TITLE);
  }

  updateView(from: string): void {
    console.log(`[${this.TITLE}#updateView] from`, from);

    this.cdr.detectChanges;
  }

  redirectTo(url: any, from: any): void {
    console.log(`[${this.TITLE}#redirectTo] ${from} | url`, url);

    this.router.navigateByUrl(`/${url}`);

    this.db.set('current_url', url);
    this.db.set('last_page', url);
    console.log(`[${this.TITLE}#redirectTo] current_url`, this.db.get('current_url'));

    this.updateView(this.TITLE);
  }

  defaultSort(): number { return 0; }

  rainbowMatrix(ms: number): void {
    const canvas = document.getElementById('rainbow-background') as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const font = 'monospace';
    const fontSize = 20;
    context.font = `${fontSize}px ${font}`;

    const cols = canvas.width;

    const charSet = 'DUDUSHY'.split('');

    const drops: string | any[] = [];
    for (let col = 0; col < cols; col++) {
      drops[col] = Math.floor(Math.random() * canvas.height);
    }

    setInterval(() => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let col = 0; col < drops.length; col++) {
        const char = charSet[Math.floor(Math.random() * charSet.length)];

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.fillText(char, col * fontSize, drops[col] * fontSize);

        if (Math.random() > 0.99) { drops[col] = 0; }
        drops[col]++;
      }
    }, ms);
  }

  toggleTaskbar(): void {
    console.log(`[${this.TITLE}#toggleTaskbar] (BEFORE) isTaskbarActive`, this.isTaskbarActive);

    this.isTaskbarActive = !this.isTaskbarActive;

    console.log(`[${this.TITLE}#toggleTaskbar] (AFTER) isTaskbarActive`, this.isTaskbarActive);

    this.updateView(this.TITLE);
  }

  toggleLanguage(): void {
    console.log(`[${this.TITLE}#toggleLanguage]`);

    this.updateView(this.TITLE);
  }

  openLink(url: string): void {
    console.log(`[${this.TITLE}#openLink] url`, url);
    window.open(url, '_blank');
  }
}
