/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}
  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
  placeSub: Subscription;
  editForm: FormGroup;
  loading: boolean = false;
  placeId: string;

  submitEditForm() {
    if (!this.editForm.valid) {
      return;
    }
    this.loadingCtrl.create({ message: 'updating offer' }).then((loadingEl) => {
      loadingEl.present();
      this.placesService
        .updatePlace(
          this.place.id,
          this.editForm.value.title,
          this.editForm.value.description
        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.editForm.reset();
          this.router.navigate(['/places/discover']);
        });
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.placeId = data.placeId;
      this.loading = true;
      this.placeSub = this.placesService.getPlaceById(data.placeId).subscribe(
        (place) => {
          this.place = place;
          this.editForm = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: 'blur',
              validators: [Validators.required],
            }),
            description: new FormControl(this.place.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)],
            }),
          });
          this.loading = false;
        },
        (error) => {
          this.alertCtrl
            .create({
              header: 'an error occured',
              message: 'place could not be fetch try again later',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/places/discover']);
                  },
                },
              ],
            })
            .then((alertEl) => {
              alertEl.present();
            });
        }
      );
    });
  }
}
