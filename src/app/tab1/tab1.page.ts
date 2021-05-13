import { ToolactionService } from './../service/toolaction.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DownloadService } from './../service/download.service';
import { Component, ViewChild } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import {
  ModalController,
  Platform,
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
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private toolactionService:ToolactionService
  ) {


  }

ngAfterViewInit(): void {
 this.platform.ready().then(()=>{
  setTimeout(()=>{
    this.callonresume_main();
  },500)
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
      {
        name: 'GB WhatsApp',
        type: 'radio',
        label: 'GB WhatsApp',
        value: 'GB WhatsApp',

      }
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



//share
share() {
  this.downloadService.share_with_all_option();
}






//slider part



  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  async segmentChanged() {
    await this.slider.slideTo(this.segment);

  }

  async slideChanged(e) {

    this.segment = await e.getActiveIndex();


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
     const pointer = this.selectedMedia.findIndex(x => x.urld ===data.downview);
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
