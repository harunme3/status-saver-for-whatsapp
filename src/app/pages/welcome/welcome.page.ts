import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import{NativeStorage} from '@ionic-native/native-storage/ngx'



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor( private nativeStorage: NativeStorage,
    private router:Router,
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




      })

  }


}
