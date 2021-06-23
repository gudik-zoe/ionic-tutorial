/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService
  ) {}
  offer: Place;
  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.offer = this.placesService.getPlaceById(data.placeId);
    });
  }
}
