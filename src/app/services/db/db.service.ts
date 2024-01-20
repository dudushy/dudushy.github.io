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
}
