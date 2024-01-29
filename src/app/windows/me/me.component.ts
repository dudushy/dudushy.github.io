/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss'
})
export class MeComponent implements OnInit {
  TITLE = 'MoreInformationComponent';

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.TITLE}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.TITLE}#ngOnInit]`);
  }

  ngOnDestroy(): void {
    console.log(`[${this.TITLE}#ngOnDestroy]`);
  }

  updateView() {
    console.log(`[${this.TITLE}#updateView]`);

    this.cdr.detectChanges;
    this.app.updateView(this.TITLE);
  }

  async redirectTo(url: any) {
    await this.app.redirectTo(url, this.TITLE);

    this.updateView();
  }
}
