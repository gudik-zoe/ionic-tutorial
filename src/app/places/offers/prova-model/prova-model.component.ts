import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-prova-model',
  templateUrl: './prova-model.component.html',
  styleUrls: ['./prova-model.component.scss'],
})
export class ProvaModelComponent implements OnInit {
  @Input() theOffer: Place;
  constructor(private modalCtrl: ModalController) {}

  doSmthn() {
    this.modalCtrl.dismiss(
      {
        firstName: 'tony',
        lastName: 'khoury',
        data: `im the ovject with the data`,
      },
      'did something'
    );
  }

  onClose() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {}
}
