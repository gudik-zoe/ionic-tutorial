/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isAuth: boolean = false;
  userId = 'a';

  constructor() {}

  login() {
    this.isAuth = true;
    this.storeData();
  }

  async storeData() {
    const data = { userId: 'a', otherData: 'theToken' };
    await Storage.set({
      key: 'AuthData',
      value: JSON.stringify(data),
    });
  }
}
