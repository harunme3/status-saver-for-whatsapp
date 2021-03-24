
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DownloadService } from './download.service';


@Injectable({
  providedIn: 'root'
})
export class ToolactionService {

  constructor(private socialSharing:SocialSharing,
    private file:File,
    private toastController: ToastController,
    private downloadService:DownloadService,) { }










 download(selectedMedia)
 {

  for(let i=0;i<selectedMedia.length;i++)
  {
   this.downloadService.download(selectedMedia[i].urld,selectedMedia[i].urls)

  }

 }






 async delete(deletearray,indices)
 {

    const path=deletearray.substring(0,deletearray.lastIndexOf('/')+1);
    const filename=deletearray.substring(deletearray.lastIndexOf('/')+1)

    let extension =deletearray.split(".").pop();


    if(extension=='mp4')
    this.downloadService.savedvideo.splice(indices,1);
    else
    this.downloadService.savedphoto.splice(indices,1);

    this.file.removeFile(path,filename).then((e)=>{
       console.log(e)
    });





    const toast = await this.toastController.create({
      message: 'Your status have been deleted',
      duration: 500,
      position:'middle',
      color:"success",
      mode:'ios',
    });
    toast.present();



 }












 repost(selectedMedia)
 {
  let options = {
     files: selectedMedia,
    appPackageName: 'com.whatsapp',
  };
  this.socialSharing.shareWithOptions(options)
 }



 share(selectedMedia)
 {
  this.socialSharing.shareWithOptions({ files: selectedMedia})
 }





}
