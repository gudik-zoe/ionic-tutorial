/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}
  isLoggedIn: boolean = true;
  onSubmit(myForm: NgForm) {
    if (!myForm.valid) {
      return;
    }
    const email = myForm.value.email;
    const password = myForm.value.password;
    if (this.isLoggedIn) {
      console.log(email + ' ' + password + 'signing in ');
    } else {
      console.log(email + ' ' + password + 'signing up ');
    }
  }

  switchAuthMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  login() {
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'loggin in' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.router.navigate(['/places/discover']);
          loadingEl.dismiss();
        }, 1500);
      });
    this.authService.login();
  }
  ngOnInit() {}
}
