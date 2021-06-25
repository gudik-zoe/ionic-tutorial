/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  constructor(
    private placesService: PlacesService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}
  thePlace: Place;

  bookPlace() {
    // this.router.navigate(['/places/discover']);
    //it goes back
    // this.navCtrl.pop();
    // this.navCtrl.navigateBack('/places/discover');
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.thePlace },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((result: any) => {
        // console.log(result.data, result.role);
        if (result.role === 'confirm') {
          console.log('booked');
        }
      });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((data: any) => {
      this.thePlace = this.placesService.getPlaceById(data.placeId);
    });
  }
}
