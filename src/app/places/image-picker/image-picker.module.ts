import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagePickerPageRoutingModule } from './image-picker-routing.module';

import { ImagePickerPage } from './image-picker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagePickerPageRoutingModule
  ],
  declarations: [ImagePickerPage]
})
export class ImagePickerPageModule {}
