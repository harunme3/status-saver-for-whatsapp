import { Tab4Page } from './../tab4/tab4.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Tab1Page } from './../tab1/tab1.page';
import { Platform } from '@ionic/angular';
import { DownloadService } from './../service/download.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private downloadService: DownloadService,
    private platform: Platform,
    private tab1Page: Tab1Page,
    private tab4Page: Tab4Page,
    private nativeStorage:NativeStorage,
  ) {}


  multipleWhatsApp;
  // for first time  it is necessary without resume event
  ionViewWillEnter() {

    this.nativeStorage.getItem('dual').then((key)=>{
      this.multipleWhatsApp=key;
  }).catch((err)=>{
    console.log("Not found")
  });
}




  ionViewDidEnter() {


this.platform.ready().then(()=>{


  this.platform.resume.subscribe(() => {
    this.tab1Page.callonresume_main();



    //stoarge
    this.nativeStorage.getItem('dual').then((key)=>{
    this.tab4Page.callonresume_dual();

    }).catch((err)=>{
      console.log("Not found")
    })




  });
})




  }




}
