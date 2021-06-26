/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
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
