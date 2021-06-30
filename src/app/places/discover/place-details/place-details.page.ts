/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit, OnDestroy {
  constructor(
    private placesService: PlacesService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}
  thePlaceSub: Subscription;
  thePlace: Place;
  ngOnDestroy() {
    this.thePlaceSub.unsubscribe();
  }

  bookPlace() {
    // this.router.navigate(['/places/discover']);
    //it goes back
    // this.navCtrl.pop();
    // this.navCtrl.navigateBack('/places/discover');
    this.actionSheetCtrl
      .create({
        header: 'choose an action',
        buttons: [
          {
            text: 'Select date',
            handler: () => {
              this.openBookingModel('select');
            },
          },
          {
            text: 'Random date',
            handler: () => {
              this.openBookingModel('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => actionSheetEl.present());
  }

  openBookingModel(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.thePlace, selectedMode: mode },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((result: any) => {
        console.log(result.data, result.role);
        if (result.role === 'confirm') {
          console.log('booked');
        }
      });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((data: any) => {
      this.thePlaceSub = this.placesService
        .getPlaceById(data.placeId)
        .subscribe((place) => {
          this.thePlace = data;
        });
    });
  }
}
