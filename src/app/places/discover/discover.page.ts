/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  constructor(private placesService: PlacesService) {}
  ngOnDestroy(): void {
    if (this.placesSubs) {
      this.placesSubs.unsubscribe();
    }
  }
  places: Place[];
  placesToBeLoad: Place[];
  placesSubs: Subscription;

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
  ngOnInit() {
    this.placesSubs = this.placesService.getPlaces().subscribe((data) => {
      this.places = data;
      this.placesToBeLoad = this.places.slice(1);
    });
  }
}
