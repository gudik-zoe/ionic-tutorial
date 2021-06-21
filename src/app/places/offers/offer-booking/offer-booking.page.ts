/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  offerId: string;
  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.offerId = data.placeId;
    });
  }
}
