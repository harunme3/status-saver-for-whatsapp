import { DownloadService } from './service/download.service';
import { Component,ViewChildren, QueryList } from '@angular/core';
import { Platform,IonRouterOutlet, AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import{NativeStorage} from '@ionic-native/native-storage/ngx'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 1000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private router: Router,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    private downloadService:DownloadService


  ) {
    this.initializeApp();
    this.backButtonEvent();

  }

  initializeApp() {


    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.pushToAppOnboarding();
       this.switchtheme();



    });
  }

  async pushToAppOnboarding() {
    await this.nativeStorage.getItem('welcome').then((key) => {
     }).catch((e)=>{
      this.router.navigate(['/welcome']);
     });
   }

   async switchtheme() {
    await this.nativeStorage.getItem('themekey').then((key) => {

       document.body.setAttribute('color-theme', 'dark');
     }).catch(()=>{
       console.log("switch theme is not set")
     })
   }


//ionic hardware backbutton



backButtonEvent() {
  this.platform.backButton.subscribeWithPriority(0, () => {
    this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
      if (this.router.url === '/tabs/tab3') {
        await this.router.navigate(['/tabs/tab2']);
      }
      else  if (this.router.url === '/tabs/tab2') {

         await this.router.navigate(['/tabs/tab1']);

      }
      else if(this.router.url === '/tabs/tab4')
      {
        await this.router.navigate(['/tabs/tab1']);
      }
      else if (this.router.url === '/tabs/tab1' && this.downloadService.statusofmodal!='open' ) {
        this.presentAlertConfirm();
      }
    });
  });
}





async presentAlertConfirm() {


  const alert = await this.alertController.create({
    header: 'Are you sure you want to exit the app?',
    cssClass: 'my-custom-class',
    mode: 'ios',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'dual-css',
      handler: () => {}
    }, {
      text: 'Yes',
      cssClass: 'dual-css',
      handler: () => {
        navigator['app'].exitApp();
      }
    }]
  });

  await alert.present();


}


















}
