/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { Plugins } from 'protractor/built/plugins';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.page.html',
  styleUrls: ['./image-picker.page.scss'],
})
export class ImagePickerPage implements OnInit {
  constructor() {}
  @Output() imagePick = new EventEmitter();
  takenImage: string;
  selectedImage: string;
  async onPickImage() {
    console.log('here');
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    const imageUrl = image.webPath;
    this.takenImage = imageUrl;
    console.log(image);
    console.log(imageUrl);
    // this.imagePick.emit(imageUrl);
    // this.camera
    //   .getPicture({
    //     quality: 50,
    //     source: this.cameraOptions.sourceType.toString(),
    //     correctOrientation: true,
    //     height: 320,
    //     width: 200,
    //     resultType: this.camera.EncodingType.JPEG,
    //   })
    //   .then((image) => {
    //     this.selectedImage = image;
    //     this.imagePick.emit(image);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return false;
    //   });
  }

  ngOnInit() {}
}
