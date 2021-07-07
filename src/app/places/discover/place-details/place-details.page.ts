/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Booking } from 'src/app/bookings/booking.model';
import { BookingService } from 'src/app/bookings/booking.service';
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
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthServiceService,
    private alertCtrl: AlertController
  ) {}
  thePlaceSub: Subscription;
  thePlace: Place;
  isBookable: boolean = false;
  loading: boolean = false;
  ngOnDestroy() {
    this.thePlaceSub.unsubscribe();
  }

  bookPlace() {
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
        if (result.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking..place' })
            .then((loader) => {
              loader.present();
              const bookingData = result.data.bookingData;
              this.bookingService
                .addBooking(
                  this.thePlace.id,
                  this.thePlace.title,
                  this.thePlace.imageUrl,
                  bookingData.firstName,
                  bookingData.lastName,
                  bookingData.guestNumber,
                  bookingData.startDate,
                  bookingData.endDate
                )
                .subscribe(
                  (data) => {
                    console.log(data);
                    loader.dismiss();
                  },
                  (error) => {
                    console.log('error occured');
                  }
                );
            });
        }
      });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((data: any) => {
      this.loading = true;
      this.thePlaceSub = this.placesService
        .getPlaceById(data.placeId)
        .subscribe(
          (place) => {
            console.log('im here');
            this.loading = false;
            this.thePlace = place;
            this.isBookable = place.userId !== this.authService.userId;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: 'an error occured',
                message: 'no place found',
                buttons: [
                  {
                    text: 'okay',
                    handler: () => {
                      this.router.navigate(['/places/discover']);
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }
}
