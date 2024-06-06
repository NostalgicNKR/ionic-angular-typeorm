import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}
  presentToast(infoMessage: string, color: string | undefined = undefined) {
    this.toastController
      .create({
        message: infoMessage,
        duration: 3000,
        color: color,
      })
      .then((toastData) => {
        toastData.present();
      });
  }

  presentSuccess(infoMessage: string) {
    this.presentToast(infoMessage, 'success');
  }

  presentError(infoMessage: string) {
    this.presentToast(infoMessage, 'danger');
  }
}
