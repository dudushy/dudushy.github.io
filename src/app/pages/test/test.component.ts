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

  baseUrl = 'https://webservice.dudushy.net';
  // baseUrl = 'https://test.dudushy.net';

  dataArray: any[] = [];
  mode = 'add';
  selectedId = null;

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
    const url = `${this.baseUrl}/api`;
    console.log(`[${this.TITLE}#loadDataArray] url`, url);

    const headers = {
      'Content-Type': 'application/json'
    };
    console.log(`[${this.TITLE}#loadDataArray] headers`, headers);

    this.app.http.get(
      url,
      {
        headers: headers
      }
    ).subscribe((data: any) => {
      console.log(`[${this.TITLE}#loadDataArray] data`, data);

      this.dataArray = data.data;
      console.log(`[${this.TITLE}#loadDataArray] this.dataArray`, this.dataArray);
    });
  }

  editItem(itemData: any) {
    console.log(`[${this.TITLE}#editItem] itemData`, itemData);

    this.mode = 'save';
    console.log(`[${this.TITLE}#editItem] this.mode`, this.mode);

    this.selectedId = itemData.id;
    console.log(`[${this.TITLE}#editItem] this.selectedId`, this.selectedId);

    const inputName = document.getElementById('input-name') as HTMLInputElement;
    console.log(`[${this.TITLE}#editItem] inputName`, inputName);

    const inputLastname = document.getElementById('input-lastname') as HTMLInputElement;
    console.log(`[${this.TITLE}#editItem] inputLastname`, inputLastname);

    const inputUsername = document.getElementById('input-username') as HTMLInputElement;
    console.log(`[${this.TITLE}#editItem] inputUsername`, inputUsername);

    const inputEmail = document.getElementById('input-email') as HTMLInputElement;
    console.log(`[${this.TITLE}#editItem] inputEmail`, inputEmail);

    inputName.value = itemData.name;
    inputLastname.value = itemData.lastname;
    inputUsername.value = itemData.username;
    inputEmail.value = itemData.email;

    // this.updateView();
  }

  saveItem() {
    console.log(`[${this.TITLE}#saveItem]`);

    const inputName = document.getElementById('input-name') as HTMLInputElement;
    console.log(`[${this.TITLE}#saveItem] inputName`, inputName);

    const inputLastname = document.getElementById('input-lastname') as HTMLInputElement;
    console.log(`[${this.TITLE}#saveItem] inputLastname`, inputLastname);

    const inputUsername = document.getElementById('input-username') as HTMLInputElement;
    console.log(`[${this.TITLE}#saveItem] inputUsername`, inputUsername);

    const inputEmail = document.getElementById('input-email') as HTMLInputElement;
    console.log(`[${this.TITLE}#saveItem] inputEmail`, inputEmail);

    const body = {
      name: inputName.value,
      lastname: inputLastname.value,
      username: inputUsername.value,
      email: inputEmail.value
    };
    console.log(`[${this.TITLE}#saveItem] body`, body);

    if (this.mode === 'add') {
      const url = `${this.baseUrl}/api/create`;
      console.log(`[${this.TITLE}#saveItem] url`, url);

      const headers = {
        'Content-Type': 'application/json'
      };
      console.log(`[${this.TITLE}#saveItem] headers`, headers);

      this.app.http.post(
        url,
        body,
        {
          headers: headers
        }
      ).subscribe((data: any) => {
        console.log(`[${this.TITLE}#saveItem] data`, data);

        this.loadDataArray();

        inputName.value = '';
        inputLastname.value = '';
        inputUsername.value = '';
        inputEmail.value = '';
      });
    }

    if (this.mode === 'save') {
      const url = `${this.baseUrl}/api/update/${this.selectedId}`;
      console.log(`[${this.TITLE}#saveItem] url`, url);

      const headers = {
        'Content-Type': 'application/json'
      };
      console.log(`[${this.TITLE}#saveItem] headers`, headers);

      this.app.http.put(
        url,
        body,
        {
          headers: headers
        }
      ).subscribe((data: any) => {
        console.log(`[${this.TITLE}#saveItem] data`, data);

        this.loadDataArray();

        inputName.value = '';
        inputLastname.value = '';
        inputUsername.value = '';
        inputEmail.value = '';
      });
    }

    this.mode = 'add';
    console.log(`[${this.TITLE}#saveItem] this.mode`, this.mode);

    this.selectedId = null;
    console.log(`[${this.TITLE}#saveItem] this.selectedId`, this.selectedId);

    // this.updateView();
  }

  deleteItem(itemData: any) {
    console.log(`[${this.TITLE}#deleteItem] itemData`, itemData);

    this.selectedId = itemData.id;
    console.log(`[${this.TITLE}#deleteItem] this.selectedId`, this.selectedId);

    // this.updateView();

    setTimeout(() => {
      const choice = confirm('Are you sure you want to delete this item?');
      console.log(`[${this.TITLE}#deleteItem] choice`, choice);

      if (!choice) {
        this.selectedId = null;

        return;
      }

      const url = `${this.baseUrl}/api/delete/${itemData.id}`;
      console.log(`[${this.TITLE}#deleteItem] url`, url);

      const headers = {
        'Content-Type': 'application/json'
      };
      console.log(`[${this.TITLE}#deleteItem] headers`, headers);

      this.app.http.delete(
        url,
        {
          headers: headers
        }
      ).subscribe((data: any) => {
        console.log(`[${this.TITLE}#deleteItem] data`, data);

        this.loadDataArray();
      });
    }, 50);
  }
}
