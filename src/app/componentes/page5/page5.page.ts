import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem,
  IonLabel, IonList, IonTitle, IonToolbar, AlertController
} from '@ionic/angular/standalone';

import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';
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

  // Función para escanear QR
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    
    const { barcodes } = await BarcodeScanner.scan();
    
    if (barcodes.length > 0) {
      this.codigoEscaneado = barcodes[0].rawValue ?? ''; // 👉 guarda el primer código encontrado
    } else {
      this.codigoEscaneado = 'No se detectó ningún código QR.';
    }
  
    this.barcodes.push(...barcodes);
    console.log('Códigos escaneados:', this.barcodes);
  }
  
  
    async requestPermissions(): Promise<boolean> {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === 'granted' || camera === 'limited';
    }
  
    async presentAlert(): Promise<void> {
      const alert = await this.alertController.create({
        header: 'Permiso denegado',
        message: 'Debes conceder permiso de cámara para usar el escáner.',
        buttons: ['OK'],
      });
      await alert.present();
    }
}
