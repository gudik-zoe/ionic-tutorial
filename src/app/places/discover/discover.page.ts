/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  constructor(
    private placesService: PlacesService,
    private authService: AuthServiceService
  ) {}
  ngOnDestroy(): void {
    if (this.placesSubs) {
      this.placesSubs.unsubscribe();
    }
  }
  placesSubs: Subscription;
  places: Place[];
  placesToBeLoad: Place[];
  relevantPlaces: Place[];
  loading: boolean = false;

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'allPlaces') {
      this.relevantPlaces = this.places;
      this.placesToBeLoad = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.places.filter(
        (place) => place.userId !== this.authService.userId
      );
      this.placesToBeLoad = this.relevantPlaces.slice(1);
    }
  }
  ngOnInit() {
    this.placesSubs = this.placesService.getPlaces().subscribe((data) => {
      this.places = data;
      this.relevantPlaces = this.places;
      this.placesToBeLoad = this.relevantPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.loading = true;
    this.placesService.fetchPlacesFromBE().subscribe(() => {
      this.loading = false;
    });
  }
}
