/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  takeMyLocation() {
    this.actionSheetCtrl
      .create({
        header: 'please choose',
        buttons: [
          { text: 'auto-locate-me', handler: () => this.locateMe() },
          { text: 'cancel', role: 'cancel' },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  private locateMe() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showError();
    }
    Plugins.Geolocation.getCurrentPosition()
      .then((geoPosition) => {
        const coordinates: any = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };
        console.log(coordinates);
      })
      .catch((err) => {
        this.showError();
      });
  }

  showError() {
    this.alertCtrl.create({
      header: 'could not fetch location',
      message: 'please turn on location detector ',
    });
  }

  ngOnInit() {}
}
