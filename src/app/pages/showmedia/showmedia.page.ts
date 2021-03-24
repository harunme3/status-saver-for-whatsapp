import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DownloadService } from './../../service/download.service';
import {  Component, Input, OnInit } from '@angular/core';
import {  ModalController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-showmedia',
  templateUrl: './showmedia.page.html',
  styleUrls: ['./showmedia.page.scss'],
})
export class ShowmediaPage implements OnInit{


  constructor(private modalController: ModalController,

    private downloadService:DownloadService,
    private socialSharing:SocialSharing,
    private toastController: ToastController,
     public file:File
    ) { }


  imageopen:boolean=false;
  videoplay:boolean=false;
  status:boolean=true;
  saved:boolean=false;

 @Input() url: string;
 @Input() from:string;
 @Input() index:number;
 @Input() urls:string;



zoomoption={
  zoom:true,
  passiveListeners: false,
}






  ngOnInit() {

  let extension = this.url.split(".").pop();

    if(extension=='mp4')
       this.videoplay=true;
    else
      this.imageopen=true;

    if(this.from=='saved')
    {
       this.saved=true;
      this.status=false;
    }

  }














  closeModal() {

    this.modalController.dismiss();


}




  async  deletesaved()
 {

const path=this.url.substring(0,this.url.lastIndexOf('/')+1);
const filename=this.url.substring(this.url.lastIndexOf('/')+1)

let extension = this.url.split(".").pop();


if(extension=='mp4')
this.downloadService.savedvideo.splice(this.index,1);
else
this.downloadService.savedphoto.splice(this.index,1);

this.file.removeFile(path,filename);


    this.modalController.dismiss();
    const toast = await this.toastController.create({
      message: 'Your status have been deleted',
      duration: 500,
      position:'middle',
      color:"success",
      mode:'ios',
    });
    toast.present();


    }








async download()
{
  await this.downloadService.download(this.url,this.urls);


    const toast = await this.toastController.create({
      message: 'Your status have been downloaded',
      duration: 500,
      position:'middle',
      color:"success",
      mode:'ios',
    });
    toast.present();
}










repost(url)
{

  this.socialSharing.shareViaWhatsApp(null,url,null).then(() => {
    // Success!
  }).catch(() => {
    // Error!
  });
}





async shareviaoption()
{
   this.socialSharing.share(null,null,this.url,null)
}










private win: any = window;

getimagesrc(urls)
{

  let path = this.win.Ionic.WebView.convertFileSrc(urls);
  return path;

}






ngOnDestroy() {

  this.downloadService.togalemodalstatus("close")

}





























}
