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

  selectedWindow: any = null;
  openedWindow: any = null;
  openedWindowTitle = '';

  startExpanded = false;

  dateTimeInterval: any = null;
  dateTitle = '';
  date = '';
  time = '';

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
    };

    window.onload = () => {
      console.log(`[${this.TITLE}#window.onload]`);

      this.stopLoading();

      const url = this.router.url.replace('/', '');
      console.log(`[${this.TITLE}#window.onload] url`, url);

      this.updateUrl(url);

      this.loadLastScrollPosition();

      this.detectScrollbar();
      this.getZoomLevel();
      this.updateDateTime();

      this.dateTimeInterval = setInterval(() => {
        this.updateDateTime();
      }, 1000 * 60 / 4);
    };

    window.onbeforeunload = (e) => {
      console.log(`[${this.TITLE}#window.onbeforeunload] e`, e);

      this.saveLastScrollPosition();
    };

    window.onclick = (e) => {
      console.log(`[${this.TITLE}#window.onclick] e`, e);

      this.closeWindow(e);
      this.closeStart(e);
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

  toggleStart() {
    console.log(`[${this.TITLE}#toggleStart] startExpanded`, this.startExpanded);

    const startElement = document.getElementsByClassName('start')[0];
    console.log(`[${this.TITLE}#toggleStart] startElement`, startElement);

    if (!startElement) return;

    const startIconElement = document.getElementsByClassName('taskbarStart')[0];
    console.log(`[${this.TITLE}#toggleStart] startIconElement`, startIconElement);

    if (!startIconElement) return;

    this.startExpanded = !this.startExpanded;

    if (this.startExpanded) {
      startElement.classList.add('expanded');
      startElement.classList.remove('collapsed');
      startIconElement.classList.add('expanded');
      startIconElement.classList.remove('collapsed');
    } else {
      startElement.classList.add('collapsed');
      startElement.classList.remove('expanded');
      startIconElement.classList.add('collapsed');
      startIconElement.classList.remove('expanded');
    }
  }

  closeStart(event: any, force = false) {
    console.log(`[${this.TITLE}#closeStart] force`, force);
    console.log(`[${this.TITLE}#closeStart] event`, event);

    console.log(`[${this.TITLE}#closeStart] startExpanded`, this.startExpanded);
    if (!this.startExpanded) return;

    const startElement = document.getElementsByClassName('start')[0];
    console.log(`[${this.TITLE}#closeStart] startElement`, startElement);

    if (!startElement) return;

    const startIconElement = document.getElementsByClassName('taskbarStart')[0];
    console.log(`[${this.TITLE}#closeStart] startIconElement`, startIconElement);

    if (!startIconElement) return;

    const condition = event?.target !== startElement &&
      event?.target !== startIconElement &&
      !startElement.contains(event?.target as Node) &&
      !startIconElement.contains(event?.target as Node);
    console.log(`[${this.TITLE}#closeStart] condition`, condition);

    if (condition || force) {
      this.startExpanded = false;
      startElement.classList.add('collapsed');
      startElement.classList.remove('expanded');
      startIconElement.classList.add('collapsed');
      startIconElement.classList.remove('expanded');
    }
  }

  updateDateTime() {
    console.log(`[${this.TITLE}#updateDateTime]`);

    const now = new Date();
    console.log(`[${this.TITLE}#updateDateTime] now`, now);

    const dateTitle = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    console.log(`[${this.TITLE}#updateDateTime] dateTitle`, dateTitle);

    const date = now.toLocaleDateString('en-US', { year: '2-digit', month: 'short', day: 'numeric' });
    console.log(`[${this.TITLE}#updateDateTime] date`, date);

    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    console.log(`[${this.TITLE}#updateDateTime] time`, time);

    const splittedDate = date.replace(',', '').split(' ');
    console.log(`[${this.TITLE}#updateDateTime] splittedDate`, splittedDate);

    const formattedDate = `${splittedDate[1]}-${splittedDate[0]}-${splittedDate[2]}`;
    console.log(`[${this.TITLE}#updateDateTime] formattedDate`, formattedDate);

    this.dateTitle = dateTitle;
    this.date = formattedDate;
    this.time = time;
  }

  stopLoading() {
    console.log(`[${this.TITLE}#stopLoading]`);

    const loader = document.getElementById('loader');
    console.log(`[${this.TITLE}#stopLoading] loader`, loader);

    if (!loader) return;

    loader.className = 'loaded';

    setTimeout(() => {
      loader.style.display = 'none';
    }, 1500);
  }

  selectWindow(window: any) {
    console.log(`[${this.TITLE}#selectWindow] window`, window);

    this.selectedWindow = window;
  }

  openWindow(window: any) {
    console.log(`[${this.TITLE}#openWindow] window`, window);

    this.openedWindow = window;
    this.openedWindowTitle = window?.replace(/-/g, ' ');
  }

  closeWindow(event: any, force = false) {
    console.log(`[${this.TITLE}#closeWindow] force`, force);
    console.log(`[${this.TITLE}#closeWindow] event`, event);

    console.log(`[${this.TITLE}#closeWindow] selectedWindow`, this.selectedWindow);
    if (!this.selectedWindow) return;

    const desktopItemElement = document.querySelector('.desktop-folder.selected, .desktop-file.selected');
    console.log(`[${this.TITLE}#closeWindow] desktopItemElement`, desktopItemElement);

    if (!desktopItemElement) return;

    const windowElement = document.getElementById('window');
    console.log(`[${this.TITLE}#closeWindow] windowElement`, windowElement);

    if (!windowElement) return;

    const condition = event.target !== desktopItemElement &&
      event.target !== windowElement &&
      !desktopItemElement.contains(event.target as Node) &&
      !windowElement.contains(event.target as Node);
    console.log(`[${this.TITLE}#closeWindow] condition`, condition);

    if (condition || force) {
      this.selectedWindow = null;
    }
  }
}
