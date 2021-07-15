/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  constructor(
    private placeService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private platForm: Platform
  ) {}

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  @Output() imagePick = new EventEmitter();
  @ViewChild('filePicker') filePicker: ElementRef<HTMLInputElement>;
  showImage: boolean = false;
  takenImage: string;
  selectedImage: string;
  userPicker: boolean = false;
  onCreateOffer() {
    if (!this.form.valid || !this.form.get('image').value) {
      return;
    }
    console.log(this.form.value);
    this.loadingCtrl
      .create({ message: 'creating place' })
      .then((loadingElement) => {
        loadingElement.present();
        this.placeService
          .addPlace(
            this.form.value.title,
            +this.form.value.price,
            this.form.value.description,
            new Date(this.form.value.dateFrom),
            new Date(this.form.value.dateTo)
          )
          .subscribe(() => {
            loadingElement.dismiss();
            this.form.reset();
            this.takenImage = null;
            this.router.navigate(['/places/discover']);
          });
      });
  }

  async onPickImage() {
    console.log('here');
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePicker.nativeElement.click();
      return;
    }
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
      const imageUrl = image.webPath;
      this.takenImage = imageUrl;
      this.form.patchValue({ image: this.takenImage });
    } catch (error) {
      console.log(error);
      if (this.filePicker) {
        this.filePicker.nativeElement.click();
      }
    }
  }
  pickedFile: any;
  onFileChosen(event: Event) {
    this.pickedFile = (event.target as HTMLInputElement).files[0];
    if (!this.pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.takenImage = dataUrl;
      // this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(this.pickedFile);
    if (this.pickedFile === 'string') {
      try {
        this.pickedFile = this.base64toBlob(
          this.pickedFile.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (err) {
        console.log('error occued changing the image type');
        return;
      }
    } else {
      this.pickedFile = this.pickedFile;
    }
    this.form.patchValue({ image: this.pickedFile });
  }

  onImagePicked() {
    let imageFile;
    if (this.pickedFile === 'string') {
      try {
        imageFile = this.base64toBlob(
          this.pickedFile.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (err) {
        console.log('error occued changing the image type');
        return;
      }
    } else {
      imageFile = this.pickedFile;
    }
    this.form.patchValue({ image: imageFile });
  }

  ngOnInit() {
    if (
      (this.platForm.is('mobile') && !this.platForm.is('hybrid')) ||
      this.platForm.is('desktop')
    ) {
      this.userPicker = true;
    }
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      image: new FormControl(null),
    });
  }
}
