
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






 async delete(selectedMedia,indices)
 {

  for(let i=0;i<selectedMedia.length;i++)
  {
    const path=selectedMedia[i].substring(0,selectedMedia[i].lastIndexOf('/')+1);
    const filename=selectedMedia[i].substring(selectedMedia[i].lastIndexOf('/')+1)

    let extension =selectedMedia[i].split(".").pop();


    if(extension=='mp4')
    this.downloadService.savedvideo.splice(indices[i],1);
    else
    this.downloadService.savedphoto.splice(indices[i],1);

    this.file.removeFile(path,filename).then(async ()=>{
      const toast = await this.toastController.create({
        message: 'Your status have been deleted',
        duration: 500,
        position:'middle',
        color:"success",
        mode:'ios',
      });
      toast.present();

    })


  }


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
