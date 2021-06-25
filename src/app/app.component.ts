import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  logout() {
    this.authService.isAuth = false;
    this.router.navigate(['/auth']);
  }
}
