/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private places: Place[] = [
    new Place(
      'p1',
      'Manhattan manion',
      'heart of NY city',
      'https://www.viagginewyork.it/wp-content/uploads/2019/11/black-friday-nypass.001.jpeg',
      148
    ),
    new Place(
      'p2',
      "l'amour toujours",
      'romantic place in paris ',
      'https://www.cia-france.com/media/1558/parcarou1_720x500.jpg',
      99
    ),
    new Place(
      'p4',
      'Thai place',
      'hleave the authenticity',
      'https://www.planetware.com/wpimages/2019/08/thailand-best-places-to-visit-bangkok.jpg',
      70
    ),
  ];
  constructor() {}

  getPlaces() {
    return [...this.places];
  }
}
