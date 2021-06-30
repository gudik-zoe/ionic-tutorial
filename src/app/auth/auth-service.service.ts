/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isAuth: boolean = true;
  userId = 'a';

  constructor() {}

  login() {
    this.isAuth = true;
  }
}
