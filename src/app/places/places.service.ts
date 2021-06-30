/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { Place } from './place.model';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private authService: AuthServiceService) {}

  private places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan manion',
      'heart of NY city',
      'https://www.viagginewyork.it/wp-content/uploads/2019/11/black-friday-nypass.001.jpeg',
      148,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'a'
    ),
    new Place(
      'p2',
      "l'amour toujours",
      'romantic place in paris ',
      'https://www.cia-france.com/media/1558/parcarou1_720x500.jpg',
      99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'a'
    ),
    new Place(
      'p4',
      'Thai place',
      'hleave the authenticity',
      'https://www.planetware.com/wpimages/2019/08/thailand-best-places-to-visit-bangkok.jpg',
      70,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'a'
    ),
    new Place(
      'p5',
      'Chineese place',
      'meditation!',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F35%2F2019%2F02%2F03193644%2Fhow-to-meditate-beginners-guide-meditation.jpg&q=85',
      120,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'a'
    ),
    new Place(
      'p6',
      'Indian massage',
      'come to relax ',
      'https://tuliazanzibar.com/wp-content/uploads/2020/04/shutterstock_1389286688.jpg',
      70,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'a'
    ),
  ]);

  getPlaces() {
    return this.places.asObservable();
  }

  getPlaceById(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    price: number,
    description: string,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://tuliazanzibar.com/wp-content/uploads/2020/04/shutterstock_1389286688.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this.places.pipe(take(1)).subscribe((data) => {
      this.places.next(data.concat(newPlace));
    });
    console.log('done');
  }
}
