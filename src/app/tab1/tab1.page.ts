import { ToolactionService } from './../service/toolaction.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DownloadService } from './../service/download.service';
import { Component, ViewChild } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import {
  ModalController,
  Platform,
  ToastController,
  AlertController,
  IonSlides,
} from '@ionic/angular';
import { ShowmediaPage } from '../pages/showmedia/showmedia.page';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {


  Photos: any[] = [];
  Videos: any[] = [];

  constructor(
    public file: File,
    public platform: Platform,
    private modalController: ModalController,
    private downloadService: DownloadService,
    private toastController: ToastController,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private toolactionService:ToolactionService
  ) {

    this.platform.ready().then(()=>{
      setTimeout(() => {
        this. callonresume_main();
      }, 1000);
    })

  }



ngAfterViewInit() {
  this.platform.ready().then(()=>{
    this.downloadService.getMedia();
    this.Photos = this.downloadService.statusphoto;
    this.Videos =  this.downloadService.statusvideo;

  })

}







    callonresume_main() {
    this.platform.ready().then(() => {
          this.downloadService.getMedia();
          this.Photos = this.downloadService.statusphoto;
          this.Videos =  this.downloadService.statusvideo;

        });
      }





//open model

  async show(url, i, urls) {
    const modal = await this.modalController.create({
      component: ShowmediaPage,
      componentProps: {
        url: url,
        from: 'status',
        index: i,
        urls: urls,
      },
    });
    this.downloadService.togalemodalstatus("open");
    return await modal.present();

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








//multiple app inserter



  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Select Your installed App',
      inputs: [
        {
          name: 'None',
          type: 'radio',
          label: 'None',
          value: 'None',
          checked: true,
        },
        {
          name: 'WA Business',
          type: 'radio',
          label: 'WA Business',
          value: 'WA Business',
        },
        {
          name: 'WhatsApp dual',
          type: 'radio',
          label: 'WhatsApp dual',
          value: 'WhatsApp dual',
        },
        {
          name: 'Business dual',
          type: 'radio',
          label: 'Business dual',
          value: 'Business dual',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'dual-css',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          cssClass: 'dual-css',
          handler: (select) => {
            console.log('Confirm Ok');

            if (select == 'None') {
              this.nativeStorage.remove('dual');
              console.log('Cleared dual key');
              this.presentAlert();
            } else {
              this.nativeStorage.setItem('dual', select).then( async() => {
                console.log('saved value');
              await  this.presentAlert();
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
     mode:'ios',
     cssClass: 'my-custom-class',
      message: 'please restart your App for setup',
      buttons: [  {
        text: 'Ok',
        cssClass: 'dual-css',
        handler:async ()=>{
         await location.reload();
        }

      }

      ]
    });

    await alert.present();
  }




  //launch App

  launchaApp() {
    this.downloadService.launchApp('com.whatsapp');
  }





//slider part



  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
    console.log("segmentchange")
  }

  async slideChanged(e) {

    this.segment = await e.getActiveIndex();
    console.log("slidechange")

  }



  slideConfig = {
    effect: 'Fade',
    slidesPerView: 1,
    centeredSlides: true,
    autoHeight: true,
    zoom:3,
  };



  //optimization

  trackbydownview(index: number, Photos: any) {
    return Photos.imagescr;
  }

  trackbydownviewv(index:number,Videos:any)
  {

    return Videos.videoscr;
  }











  // checbox and tool box


 selectedMedia = [];
 indices=[];
 async markForDownload(event,data,index){

  var extension = data.downview.split('.').pop();


    if(event.detail.checked) {
      if(extension=="mp4")
      {
        this.selectedMedia.push({urld:data.downview,urls:data.videoscr});
      }
      else
      {
        this.selectedMedia.push({urld:data.downview,urls:data.imagescr});
      }

      this.indices.push(index);
    }

    if(!event.detail.checked) {
     const pointer = this.selectedMedia.findIndex(x => x.urld ===data.downview)
     console.log(pointer)
     const pointerindex = this.indices.indexOf(index, 0);
    this.selectedMedia.splice(pointer,1);
    this.indices.splice(pointerindex,1);
    }





  }









// action tool


downloadtool()
{

 this.toolactionService.download(this.selectedMedia)
 this.tapEvent();
}

reposttool()
{

 let repostarray=[];

for(let i=0;i<this.selectedMedia.length;i++)
{
 repostarray.push(this.selectedMedia[i].urld)
}

this.toolactionService.repost(repostarray);
this.tapEvent();

}



sharetool()
{

  let repostarray=[];

  for(let i=0;i<this.selectedMedia.length;i++)
  {
   repostarray.push(this.selectedMedia[i].urld)
  }
this.toolactionService.share(repostarray);
this.tapEvent();

}





// gestur toggle function hammerjs
checkbox:boolean=false;
tapEvent(){
this.checkbox=!this.checkbox;
this.selectedMedia.splice(0,this.selectedMedia.length);
}

ionViewWillLeave()
{
this.checkbox=false;
}





}
