/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) {}

  editForm: FormGroup;

  submitEditForm() {
    console.log(this.editForm.value);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.place = this.placesService.getPlaceById(data.placeId);
    });
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
  }
}
