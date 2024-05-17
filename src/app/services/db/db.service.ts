/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  TITLE = 'DbService';

  constructor() {
    console.log(`[${this.TITLE}#constructor]`);

    // this.clearAll();
    this.setupDb();
  }

  setupDb() {
    console.log(`[${this.TITLE}#setupDb]`);
  }

  clearAll() {
    console.log(`[${this.TITLE}#clearAll]`);

    localStorage.clear();
    sessionStorage.clear();
  }

  getLocal(varname: string) {
    const output = JSON.parse(localStorage.getItem(varname) || 'null');
    console.log(`[${this.TITLE}#get] varname: ${varname} | output:`, output);
    return output;
  }

  setLocal(varname: string, value: any) {
    console.log(`[${this.TITLE}#set] varname: ${varname} | value:`, value);
    localStorage.setItem(varname, JSON.stringify(value));
  }

  getSession(varname: string) {
    const output = JSON.parse(sessionStorage.getItem(varname) || 'null');
    console.log(`[${this.TITLE}#get] varname: ${varname} | output:`, output);
    return output;
  }

  setSession(varname: string, value: any) {
    console.log(`[${this.TITLE}#set] varname: ${varname} | value:`, value);
    sessionStorage.setItem(varname, JSON.stringify(value));
  }

  setCookie(name: string, value: string, ms: number, secure: boolean = true, httpOnly: boolean = false, sameSite: 'Lax' | 'Strict' | 'None' = 'Lax'): void {
    const date = new Date();
    date.setTime(date.getTime() + ms);

    let cookieString = `${name}=${value};expires=${date.toUTCString()};path=/`;

    if (secure) {
      cookieString += ';Secure';
    }

    if (httpOnly) {
      cookieString += ';HttpOnly';
    }

    if (sameSite) {
      cookieString += `;SameSite=${sameSite}`;
    }

    console.log(`[${this.TITLE}#setCookie] cookieString:`, cookieString);
    document.cookie = cookieString;
  }

  getCookie(name: string): any {
    console.log(`[${this.TITLE}#getCookie] name: ${name}`);

    const nameEQ = `${name}=`;

    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }
}
