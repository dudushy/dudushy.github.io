/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  TITLE = 'TestComponent';

  dataArray: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.TITLE}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.TITLE}#ngOnInit]`);

    this.loadDataArray();
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

  loadDataArray() {
    this.app.http.get(
      'https://webservice.dudushy.net/api',
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).subscribe((data: any) => {
      console.log(`[${this.TITLE}#loadDataArray] data`, data);

      this.dataArray = data.data;
      console.log(`[${this.TITLE}#loadDataArray] this.dataArray`, this.dataArray);
    });
  }
}
