/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController
  ) {}
  thePlace: Place;

  bookPlace() {
    // this.router.navigate(['/places/discover']);
    //it goes back
    // this.navCtrl.pop();
    this.navCtrl.navigateBack('/places/discover');
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((data: any) => {
      this.thePlace = this.placesService.getPlaceById(data.placeId);
    });
  }
}
