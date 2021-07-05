/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { Place } from './place.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(
    private authService: AuthServiceService,
    private http: HttpClient
  ) {}

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
      'B'
    ),
  ]);

  getPlaces() {
    return this.places.asObservable();
  }

  getPlaceById(id: string) {
    return this.http
      .get(
        'https://ionic-tutorial-e1439-default-rtdb.europe-west1.firebasedatabase.app/offered-places/' +
          id +
          '.json'
      )
      .pipe(
        map((place: Place) => {
          return new Place(
            id,
            place.title,
            place.description,
            place.imageUrl,
            place.price,
            new Date(place.availableFrom),
            new Date(place.availableTo),
            place.userId
          );
        })
      );
  }

  fetchPlacesFromBE() {
    return this.http
      .get<{ [key: string]: Place }>(
        'https://ionic-tutorial-e1439-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json'
      )
      .pipe(
        map((resData) => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this.places.next(places);
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
    let generatedId: string;
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
    return this.http
      .post<{ name: string }>(
        'https://ionic-tutorial-e1439-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json',
        {
          ...newPlace,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((resData) => {
          newPlace.id = generatedId;
          this.places.next(resData.concat(newPlace));
        })
      );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((places) => {
    //     setTimeout(() => {
    //       this.places.next(places.concat(newPlace));
    //     }, 1000);
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlacesFromBE();
        } else {
          return of(places);
        }
      }),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex(
          (place) => place.id === placeId
        );
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          'https://ionic-tutorial-e1439-default-rtdb.europe-west1.firebasedatabase.app/offered-places/' +
            placeId +
            '.json',
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this.places.next(updatedPlaces);
      })
    );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((places) => {
    //     const updatedPlaceIndex = places.findIndex(
    //       (place) => (place.id = placeId)
    //     );
    //     this.places.next(updatedPlaces);
    //   })
    // );
  }
}
