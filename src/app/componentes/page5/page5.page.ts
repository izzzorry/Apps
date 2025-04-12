import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput,
  IonItem, IonLabel, IonList, IonTitle, IonToolbar
} from '@ionic/angular/standalone';

import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { scan } from 'ionicons/icons';

@Component({
  selector: 'app-page-qr',
  templateUrl: './page5.page.html',
  styleUrls: ['./page5.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    IonList, IonItem, IonInput, IonLabel, IonFab, IonFabButton, IonIcon
  ]
})
export class Page5Page implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {
    addIcons({ scan });
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Debes permitir acceso a la cámara para escanear códigos.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

