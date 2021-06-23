import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private authService: AuthServiceService) {}
  login() {
    this.authService.login();
  }
  ngOnInit() {}
}
