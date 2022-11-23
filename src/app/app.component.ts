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

    this.loadTheme();
  }

  ngOnInit(): void {
    console.log(`[${this.TITLE}#ngOnInit]`);

    window.onload = () => this.rainbowMatrix(25);
    window.onresize = () => this.rainbowMatrix(25);
  }

  toggleTheme(): void {
    // console.log(`[${this.title}#toggleTheme]`);

    const theme = this.db.get('theme');
    console.log(`[${this.TITLE}#toggleTheme] theme`, theme);

    if (theme == 'light') {
      //? dark theme
      this.db.set('theme', 'dark');
      document.body.setAttribute('theme', this.db.get('theme'));
    } else {
      //? light theme
      this.db.set('theme', 'light');
      document.body.setAttribute('theme', this.db.get('theme'));
    }
  }

  loadTheme(): void {
    // console.log(`[${this.title}#loadTheme]`);

    const theme = this.db.get('theme');
    console.log(`[${this.TITLE}#loadTheme] theme`, theme);

    document.body.setAttribute('theme', this.db.get('theme'));
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
    const font = 'arial';
    const fontSize = 10;
    context.font = `${fontSize}px ${font}`;

    const cols = canvas.width / fontSize;

    const charSet = 'B01JD'.split('');

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

}
