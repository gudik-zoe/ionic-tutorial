/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService
  ) {}
  ngOnDestroy(): void {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }
  offer: Place;
  offerSub: Subscription;
  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.offerSub = this.placesService
        .getPlaceById(data.placeId)
        .subscribe((offer) => {
          this.offer = offer;
        });
    });
  }
}
