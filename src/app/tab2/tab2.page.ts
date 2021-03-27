import {
  IonSlides,
  ModalController,
  Platform,
  PopoverController,
} from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { DownloadService } from '../service/download.service';
import { RatepopoverComponent } from '../pages/ratepopover/ratepopover.component';
import { ShowmediaPage } from '../pages/showmedia/showmedia.page';
import { ToolactionService } from '../service/toolaction.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    private platform: Platform,
    private downloadService: DownloadService,
    public popoverController: PopoverController,
    private modalController: ModalController,
    private toolactionService: ToolactionService
  ) {

  }

  Photos: any[] = [];
  Videos: any[] = [];

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.downloadService.getMediasaved();
      this.Photos = this.downloadService.savedphoto;
      this.Videos = this.downloadService.savedvideo;
    });
  }

  async show(url, i, urls) {
    const modal = await this.modalController.create({
      component: ShowmediaPage,
      componentProps: {
        url: url,
        from: 'saved',
        index: i,
        urls: urls,
      },
    });

    return await modal.present();
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: RatepopoverComponent,
      cssClass: 'my-custom-class',

      translucent: true,
    });
    return await popover.present();
  }

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
    zoom: 3,
  };

  //optimization

  trackbydownview(index: number, Photos: any) {
    return Photos.imagescr;
  }

  trackbydownviewv(index: number, Videos: any) {
    return Videos.videoscr;
  }

  // checbox and tool box

  selectedMedia = [];
  indices = [];
  async markForDownload(event, data, index) {
    var extension = data.downview.split('.').pop();

    if (event.detail.checked) {
      if (extension == 'mp4') {
        this.selectedMedia.push({ urld: data.downview, urls: data.videoscr });
      } else {
        this.selectedMedia.push({ urld: data.downview, urls: data.imagescr });
      }




      this.indices.push(index);
    }

    if (!event.detail.checked) {
      const pointer = this.selectedMedia.findIndex(
        (x) => x.urld === data.downview
      );

      const pointerindex = this.indices.indexOf(index, 0);
      this.selectedMedia.splice(pointer, 1);
      this.indices.splice(pointerindex, 1);
    }
  }





  // action tool

  deletetool() {

    for (let i = 0; i < this.selectedMedia.length; i++) {
      this.toolactionService.delete(this.selectedMedia[i].urld, this.indices);

    }
 this.tapEvent();
  }

  reposttool() {
    let repostarray = [];

    for (let i = 0; i < this.selectedMedia.length; i++) {
      repostarray.push(this.selectedMedia[i].urld);
    }

    this.toolactionService.repost(repostarray);
    this.tapEvent();
  }

  sharetool() {
    let repostarray = [];

    for (let i = 0; i < this.selectedMedia.length; i++) {
      repostarray.push(this.selectedMedia[i].urld);
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
