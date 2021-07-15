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
import { Plugins, Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { Plugins } from 'protractor/built/plugins';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.page.html',
  styleUrls: ['./image-picker.page.scss'],
})
export class ImagePickerPage implements OnInit {
  constructor(private platForm: Platform) {}
  @Output() imagePick = new EventEmitter();
  @ViewChild('filePicker') filePicker: ElementRef<HTMLInputElement>;
  takenImage: string;
  selectedImage: string;
  userPicker: boolean = false;
  async onPickImage() {
    console.log('here');
    if (!Capacitor.isPluginAvailable('Camera') || this.userPicker) {
      this.filePicker.nativeElement.click();
      return;
    }
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    const imageUrl = image.webPath;
    this.takenImage = imageUrl;
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.takenImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }

  ngOnInit() {
    if (
      (this.platForm.is('mobile') && !this.platForm.is('hybrid')) ||
      this.platForm.is('desktop')
    ) {
      this.userPicker = true;
    }
  }
}
