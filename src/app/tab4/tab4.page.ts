import { DownloaddualService } from './../service/downloaddual.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DownloadService } from "./../service/download.service";
import { Component, ViewChild } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { AlertController, IonSlides, ModalController, Platform, ToastController } from "@ionic/angular";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ShowmediaPage } from "../pages/showmedia/showmedia.page";
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ToolactionService } from '../service/toolaction.service';

@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
})
export class Tab4Page {


  Photosdual: any[]=[];
  Videosdual: any[]=[];
  options: AnimationOptions = {
 path: '../../assets/image/astro.json'
}
lottiecard:boolean=false;
appname:string="";



  constructor(
    public file: File,
    public platform: Platform,
    private downloadService: DownloadService,
    private socialSharing:SocialSharing,
     private alertController: AlertController,
    private toastController: ToastController,
    private downloaddualService:DownloaddualService,
    private nativeStorage:NativeStorage,
    private modalController: ModalController,
    private toolactionService:ToolactionService

  ) {


this.platform.ready().then(()=>{
  setTimeout(() => {
    this.showlottie();
  }, 1000);
})

  }



ngAfterViewInit()
{

  this.platform.ready().then(() => {


    this.nativeStorage.getItem('dual').then((key)=>{
      if(key=="WhatsApp dual")
      {

     this.downloaddualService.getMedia("file:///storage/emulated/999/","WhatsApp/Media", "WhatsApp/Media/.Statuses");
     this.Photosdual = this.downloaddualService.statusphoto;
     this.Videosdual=this.downloaddualService.statusvideo;

      }
      else if(key=="Business dual")
      {

  this.downloaddualService.getMedia("file:///storage/emulated/999/","WhatsApp Business/Media", "WhatsApp Business/Media/.Statuses");
  this.Photosdual =this.downloaddualService.statusphoto;
  this.Videosdual= this.downloaddualService.statusvideo;


      }
      else if(key=="GB WhatsApp")
      {


        this.downloaddualService.getMedia("file:///storage/emulated/0/","GBWhatsApp/Media", "GBWhatsApp/Media/.Statuses");
      this.Photosdual = this.downloaddualService.statusphoto;
      this.Videosdual=this.downloaddualService.statusvideo;
      }
      else
      {

      this.downloaddualService.getMedia("file:///storage/emulated/0/","WhatsApp Business/Media", "WhatsApp Business/Media/.Statuses");
      this.Photosdual = this.downloaddualService.statusphoto;
      this.Videosdual=this.downloaddualService.statusvideo;


      }


      }).catch((err)=>{
        console.log(err)
      })









  });

}

showlottie()
{

  if( !(this.Photosdual.length||this.Videosdual.length))
  {
      this.lottiecard=true;
      this.nativeStorage.getItem('dual').then((key)=>{this.appname=key})

  }
}


callonresume_dual()
{
  this.platform.ready().then(() => {

    this.nativeStorage.getItem('dual').then((key)=>{
      if(key=="WhatsApp dual")
      {
        this.downloaddualService.getMedia("file:///storage/emulated/999/","WhatsApp/Media", "WhatsApp/Media/.Statuses");
        this.Photosdual = this.downloaddualService.statusphoto;
        this.Videosdual=this.downloaddualService.statusvideo;
      }
      else if(key=="Business dual")
      {


  this.downloaddualService.getMedia("file:///storage/emulated/999/","WhatsApp Business/Media", "WhatsApp Business/Media/.Statuses");
  this.Photosdual = this.downloaddualService.statusphoto;
  this.Videosdual=this.downloaddualService.statusvideo;

      }
      else if(key=="GB WhatsApp")
      {
        this.downloaddualService.getMedia("file:///storage/emulated/0/","GBWhatsApp/Media", "GBWhatsApp/Media/.Statuses");
        this.Photosdual = this.downloaddualService.statusphoto;
        this.Videosdual=this.downloaddualService.statusvideo;
      }
      else
      {
      this.downloaddualService.getMedia("file:///storage/emulated/0/","WhatsApp Business/Media", "WhatsApp Business/Media/.Statuses");
      this.Photosdual = this.downloaddualService.statusphoto;
      this.Videosdual=this.downloaddualService.statusvideo;

      }


      }).catch((err)=>{
        console.log(err)
      })


  });

}




async show(url,i,urls)
{

 const modal = await this.modalController.create({
  component: ShowmediaPage,
  componentProps: {
    url: url,
    from: "status",
    index:i,
    urls:urls
  },
});

return await modal.present();


}



  shareApp()
  {
    this.file
    .copyFile(
      this.file.applicationDirectory + 'www/assets/image/',
      'sharewithlink.jpg',
      this.file.externalRootDirectory,
      ''
    )
    .then((image)=>{

      this.socialSharing.shareViaWhatsApp('Download photos and videos from whatsApp status offline ', image.nativeURL,'https://play.google.com/store/apps/details?id=com.trv.statussaverforwhatsapp').then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }).catch((e)=>{
      console.log(e)
    })





  }




  async presentToast() {
    const toast = await this.toastController.create({
      message: 'If any status is not showing please watch full status on whatsapp',
      duration: 5000,
      "mode": "ios",
      position: 'top',
      color:"success",
      buttons: [
        {

          text: 'Okay',
          role: 'cancel'
        }
      ]

    });
    toast.present();
  }

//launch app
launchaApp()
{
this.downloadService.launchApp("com.whatsapp.w4b")

}



async presentAlertRadio() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    mode:"ios",
    header: 'Select Your installed App',
    inputs: [

      {
        name: 'None',
        type: 'radio',
        label: 'None',
        value: 'None',
        checked: true
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

      } ,
      {
        name: 'Business dual',
        type: 'radio',
        label: 'Business dual',
        value: 'Business dual',

      }
      ,
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
        }
      }, {
        text: 'Ok',
        cssClass: 'dual-css',
        handler: (select) => {
          console.log('Confirm Ok');



          if(select=="None")
          {
            this.nativeStorage.remove('dual');
            console.log("Cleared dual key")
            this.presentAlert();
          }
          else
          {
            this.nativeStorage.setItem('dual',select).then(()=>{
              console.log("saved value")
              this.presentAlert();
            })

          }




        }
      }
    ]
  });

  await alert.present();
}



closeselection()
{
  this.nativeStorage.remove('dual');
  this.presentAlert();
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
      await  location.reload();
      }
    }]
  });

  await alert.present();
}




// slider part



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
      const pointer = this.selectedMedia.findIndex(x => x.urld ===data.downview)

      const pointerindex = this.indices.indexOf(index, 0);
     this.selectedMedia.splice(pointer,1);
     this.indices.splice(pointerindex,1);
     }





   }









 // action tool


 downloadtool()
 {


  this.toolactionService.download(this.selectedMedia);
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
