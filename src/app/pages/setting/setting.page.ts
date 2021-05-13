import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DownloadService } from '../../service/download.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private downloadService:DownloadService, private toastController: ToastController) { }

  ngOnInit() {
  }

  share()
{
  this.downloadService.share_with_all_option();
}

//help or i button

async presentToast() {
  const toast = await this.toastController.create({
    message:
      'If any status is not showing please watch full status on whatsapp',
    duration: 5000,
    mode: 'ios',
    position: 'top',
    color: 'success',
    buttons: [
      {
        text: 'Okay',
        role: 'cancel',
      },
    ],
  });
  toast.present();
}

}
