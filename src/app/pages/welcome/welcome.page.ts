import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import{NativeStorage} from '@ionic-native/native-storage/ngx'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor( private nativeStorage: NativeStorage,
    private router:Router,
    private androidPermissions:AndroidPermissions,
    private file:File
    ) {}




  ngOnInit() {

  }
 getStarted() {
    this.nativeStorage.setItem('welcome', 'baby');
    this.router.navigate(['/tabs']);

    this.file.createDir(this.file.externalRootDirectory,'WStatusSaver',false).then(()=>{

    }).catch(()=>{
      console.log("already exist");
    })



  }

next()
{
  this.slides.slideNext();
}


  permissionbyslide()
  {
      this.slides.getActiveIndex().then((index)=>{


        if(index==2)
        {
          let list: string[] = [
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          ];

          this.androidPermissions
            .checkPermission(
              this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
            )
            .then((res) => {
              console.log("permission garnteed")
               if(!res.hasPermission)
               {
                this.androidPermissions.requestPermissions(list);

               }//

            },err=>{
              console.log("no permission error")
              this.androidPermissions.requestPermissions(list);

            });
        }

      })

  }


}
