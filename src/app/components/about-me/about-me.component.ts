/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DbService } from '../../services/db/db.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  TITLE = 'AboutMeComponent';

  constructor(
    public db: DbService,
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.TITLE}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.TITLE}#ngOnInit]`);
    this.app.updateView(this.TITLE);
  }

  updateView(): void {
    console.log(`[${this.TITLE}#updateView]`);

    this.cdr.detectChanges;
    this.app.updateView(this.TITLE);
  }

  redirectTo(url: any): void {
    this.app.redirectTo(url, this.TITLE);

    this.updateView();
  }

  defaultSort(): number { return 0; }
}