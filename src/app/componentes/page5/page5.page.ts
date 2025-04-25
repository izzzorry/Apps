import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem,
  IonLabel, IonList, IonTitle, IonToolbar, AlertController
} from '@ionic/angular/standalone';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { addIcons } from 'ionicons';
import { scan } from 'ionicons/icons';

@Component({
  selector: 'app-page-qr',
  templateUrl: './page5.page.html',
  styleUrls: ['./page5.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon
  ]
})
export class Page5Page {
  codigoEscaneado: string = '';
  barcodes: any[] = [];
isSupported = true;


  constructor(private alertController: AlertController) {
    addIcons({ scan });
  }

  async scan() {
    BarcodeScanner.hideBackground(); 
    document.body.classList.add('scanner-active');

    const status = await BarcodeScanner.checkPermission({ force: true });

    if (!status.granted) {
      this.presentAlert();
      document.body.classList.remove('scanner-active');
      return;
    }

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.codigoEscaneado = result.content;
      alert('Código escaneado:\n' + result.content);
    } else {
      alert('No se detectó ningún código.');
    }

    BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
    document.body.classList.remove('scanner-active');
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
