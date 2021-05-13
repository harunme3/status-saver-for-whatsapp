import { DownloaddualService } from './service/downloaddual.service';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule,HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { RatepopoverComponent } from './pages/ratepopover/ratepopover.component';
import { ShowmediaPageModule } from './pages/showmedia/showmedia.module';
import { DownloadService } from './service/download.service';
import{AppLauncher} from '@ionic-native/app-launcher/ngx'
import{FormsModule} from '@angular/forms'


@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
      // I will only use the swap gesture so
      // I will deactivate the others to avoid overlaps
      'pinch': { enable: false },
      'rotate': { enable: false }
  }
}





@NgModule({
  declarations: [AppComponent,RatepopoverComponent],
  entryComponents: [],
  imports: [BrowserModule,HammerModule, IonicModule.forRoot(), AppRoutingModule,ShowmediaPageModule ,FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    DownloadService,
    DownloaddualService,
    File,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
     VideoEditor,
    SocialSharing,
    AppLauncher
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
