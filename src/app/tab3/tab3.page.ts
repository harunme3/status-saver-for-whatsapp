import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  values = '91';
  constructor(
    private router: Router,
    private toastController: ToastController,
    private nativeStorage: NativeStorage
  ) {}

  setting() {
    this.router.navigate(['setting']);
  }

  async onsubmit(form: NgForm) {
    if (!form.value.code || !form.value.number) {
      const toast = await this.toastController.create({
        message: 'You have not entered mobile number or country code',
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

    if (form.value.number && form.value.code)
      window.open(
        `https://wa.me/${form.value.code + form.value.number}?text=${
          form.value.msg
        }`
      );
  }





visible =false;

  toggletheme(ev) {

    this.visible = !this.visible;
    if (this.visible) {
      document.body.setAttribute('color-theme', 'dark');
      this.nativeStorage.setItem("themekey","setkey")
    } else {
      document.body.setAttribute('color-theme', 'light');
      this.nativeStorage.remove("themekey")
    }
  }


}
