import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { ProvaModelComponent } from '../places/offers/prova-model/prova-model.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BookingsPageRoutingModule],
  declarations: [BookingsPage, ProvaModelComponent],
})
export class BookingsPageModule {}
