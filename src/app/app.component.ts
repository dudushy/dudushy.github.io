/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from './services/db/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  PROJECT_NAME = 'Portfolio';
  PROJECT_DIR = 'portfolio';

  TITLE = 'AppComponent';

  allPages: any = [];
  currentPage: any = null;

  theme = 'dark';
  hasScrollbar = false;

  rainbowMatrixInterval = 25;

  constructor(
    private cdr: ChangeDetectorRef,
    public router: Router,
    public db: DbService,
  ) {
    console.log(`[${this.TITLE}#constructor]`);

    const rawAllPages = this.router.config;
    console.log(`[${this.TITLE}#constructor] rawAllPages`, rawAllPages);

    this.allPages = rawAllPages.filter((page: any) => {
      return (
        page.path !== '' &&
        page.path !== '**' &&
        page.path !== 'home' &&
        page.path !== 'test' &&
        page.path !== 'not-found'
      );
    });

    console.log(`[${this.TITLE}#constructor] allPages`, this.allPages);

    this.theme = this.db.getLocal('theme') || 'dark';
    this.toggleTheme(this.theme);

    window.onresize = () => {
      console.log(`[${this.TITLE}#window.onresize]`);

      this.detectScrollbar();
      this.getZoomLevel();
      this.rainbowMatrix(this.rainbowMatrixInterval);
    };

    window.onload = () => {
      console.log(`[${this.TITLE}#window.onload]`);

      const url = this.router.url.replace('/', '');
      console.log(`[${this.TITLE}#window.onload] url`, url);

      this.updateUrl(url);

      this.loadLastScrollPosition();

      this.detectScrollbar();
      this.getZoomLevel();
      this.rainbowMatrix(this.rainbowMatrixInterval);
    };

    window.onbeforeunload = (e) => {
      console.log(`[${this.TITLE}#window.onbeforeunload] e`, e);

      this.saveLastScrollPosition();
    };
  }

  updateView(from: string) {
    console.log(`[${this.TITLE}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  async redirectTo(url: any, from: any) {
    console.log(`[${this.TITLE}#redirectTo] ${from} | url`, url);

    await this.router.navigateByUrl(`/${url}`);

    this.updateUrl(url);
  }

  updateUrl(url: any) {
    console.log(`[${this.TITLE}#updateUrl] url`, url);

    this.currentPage = url;
    this.db.setLocal('last_page', url);
    console.log(`[${this.TITLE}#redirectTo] last_page`, this.db.getLocal('last_page'));

    const appRoot = document.querySelector('app-root');
    console.log(`[${this.TITLE}#redirectTo] appRoot`, appRoot);

    if (appRoot) appRoot.scrollTop = 0;
  }

  defaultOrder() { return 0; }

  openLink(url: string) { window.open(url, '_blank'); }

  toggleTheme(theme: any) {
    console.log(`[${this.TITLE}#toggleTheme] theme`, theme);

    this.theme = theme;
    this.db.setLocal('theme', theme);

    document.documentElement.setAttribute('theme', theme);
    document.documentElement.style.setProperty('--theme', theme);

    this.updateView(this.TITLE);
  }

  detectScrollbar() {
    const appRoot = document.querySelector('app-root');
    console.log(`[${this.TITLE}#detectScrollbar] appRoot`, appRoot);

    if (!appRoot) return;

    this.hasScrollbar = appRoot.scrollHeight > appRoot.clientHeight;
    console.log(`[${this.TITLE}#detectScrollbar] hasScrollbar`, this.hasScrollbar);
  }

  getZoomLevel() {
    return; //!OUT OF ORDER

    console.log(`[${this.TITLE}#getZoomLevel] window.visualViewport`, window.visualViewport);
    console.log(`[${this.TITLE}#getZoomLevel] window.visualViewport?.scale`, window.visualViewport?.scale);

    const isDeviceMode = window.visualViewport && window.visualViewport?.scale !== 1;
    console.log(`[${this.TITLE}#getZoomLevel] isDeviceMode`, isDeviceMode);

    const zoomLevel = window.devicePixelRatio || 1;
    console.log(`[${this.TITLE}#getZoomLevel] zoomLevel`, zoomLevel);

    const zoomRatio = isDeviceMode ? 1 : zoomLevel;
    console.log(`[${this.TITLE}#getZoomLevel] zoomRatio`, zoomRatio);

    document.documentElement.style.setProperty('--zoomRatio', `${zoomRatio}`);
  }

  saveLastScrollPosition() {
    console.log(`[${this.TITLE}#saveLastScrollPosition]`);

    const appRoot = document.querySelector('app-root');
    console.log(`[${this.TITLE}#saveLastScrollPosition] appRoot`, appRoot);

    if (!appRoot) return;

    const main = appRoot.firstChild as HTMLElement;
    console.log(`[${this.TITLE}#saveLastScrollPosition] main`, main);

    const url = this.router.url.replace('/', '');
    console.log(`[${this.TITLE}#saveLastScrollPosition] url`, url);

    this.db.setSession(`lastScrollPosition-${url}`, main.scrollTop);
    console.log(`[${this.TITLE}#saveLastScrollPosition] lastScrollPosition`, this.db.getSession(`lastScrollPosition-${url}`));
  }

  loadLastScrollPosition() {
    console.log(`[${this.TITLE}#loadLastScrollPosition]`);

    const appRoot = document.querySelector('app-root');
    console.log(`[${this.TITLE}#loadLastScrollPosition] appRoot`, appRoot);

    if (!appRoot) return;

    const main = appRoot.firstChild as HTMLElement;
    console.log(`[${this.TITLE}#loadLastScrollPosition] main`, main);

    const url = this.router.url.replace('/', '');
    console.log(`[${this.TITLE}#saveLastScrollPosition] url`, url);

    const lastScrollPosition = this.db.getSession(`lastScrollPosition-${url}`);
    console.log(`[${this.TITLE}#loadLastScrollPosition] lastScrollPosition`, lastScrollPosition);

    if (lastScrollPosition) {
      main.scrollTop = lastScrollPosition;
    }
  }

  rainbowMatrix(ms: number): void {
    console.log(`[${this.TITLE}#rainbowMatrix] ms`, ms);

    const canvas = document.getElementById('rainbow-background') as HTMLCanvasElement;
    canvas.remove();

    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'rainbow-background';
    newCanvas.style.cssText = 'position: absolute; top: 0; left: 0; z-index: -1;';

    const contentDiv = document.getElementById('main-content') as HTMLDivElement;
    contentDiv.appendChild(newCanvas);

    newCanvas.height = window.innerHeight;
    newCanvas.width = window.innerWidth;

    const context = newCanvas.getContext('2d') as CanvasRenderingContext2D;
    context.clearRect(0, 0, newCanvas.width, newCanvas.height);

    const font = 'monospace';
    const fontSize = 20;
    context.font = `${fontSize}px ${font}`;

    const cols = newCanvas.width;

    const charSet = 'DUDUSHY'.split('');

    const drops: string | any[] = [];
    for (let col = 0; col < cols; col++) {
      drops[col] = Math.floor(Math.random() * newCanvas.height);
    }

    setInterval(() => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, newCanvas.width, newCanvas.height);

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
