import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthServiceService } from './auth/auth-service.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Plugins, Capacitor } from '@Capacitor/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private platform: Platform
  ) // private splashScreen: SplashScreen,
  // private statusBar: StatusBar
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  logout() {
    this.authService.isAuth = false;
    this.router.navigate(['/auth']);
  }
}
