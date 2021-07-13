import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagePickerPage } from './image-picker.page';

const routes: Routes = [
  {
    path: '',
    component: ImagePickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagePickerPageRoutingModule {}
