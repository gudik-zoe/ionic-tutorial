/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  constructor(
    private placesService: PlacesService,
    private router: Router,
    private loadinCtrl: LoadingController
  ) {}
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
  offers: Place[];
  loading: boolean = false;
  private placesSub: Subscription;

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/places/offers/edit/' + offerId]);
  }
  ngOnInit() {
    this.placesSub = this.placesService.getPlaces().subscribe((data) => {
      this.offers = data;
    });
  }
  ionViewWillEnter() {
    this.loading = true;
    this.placesService.fetchPlacesFromBE().subscribe(() => {
      console.log('here');
      this.loading = false;
    });
  }
}
