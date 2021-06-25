import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  login() {
    this.authService.login();
    this.router.navigate(['/places/discover']);
  }
  ngOnInit() {}
}
