import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {
  AppLauncher,
  AppLauncherOptions,
} from '@ionic-native/app-launcher/ngx';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    public file: File,

    private videoEditor: VideoEditor,
    private socialSharing: SocialSharing,

    private appLauncher: AppLauncher
  ) {}

  statusphoto: any[] = [];
  statustempvideos: any[] = [];
  statusvideo: any[] = [];

  getMedia() {
    const root = this.file.externalRootDirectory;
    this.file
      .checkDir(root, 'WhatsApp/Media')
      .then(() => {
        this.file
          .listDir(root, 'WhatsApp/Media/.Statuses')
          .then((files) => {
            this.statusphoto.splice(0, this.statusphoto.length);
            this.statustempvideos.splice(0, this.statustempvideos.length);

            const mediaMap = files.map(async (media) => {
              let extension = media.name.split('.').pop();

              if (extension === 'mp4') {
                this.statustempvideos.push(media);
              } else if (extension === 'jpg' || extension === 'jpeg') {
                let imagescr = this.getimagesrc(media.nativeURL);
                let downview = media.nativeURL;
                this.statusphoto.push({
                  imagescr: imagescr,
                  downview: downview,
                });
              }
            });

            this.createThumb(this.statustempvideos, 0);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  //end day

  createThumb(video, i) {
    let len = video.length;
    let d = new Date();
    let remoteFileUrl = video[i].nativeURL;
    let fileName = d.getTime().toString();
    if (i == 0) {
      this.statusvideo.splice(0, this.statusvideo.length);
    }

    if (len) {
      this.videoEditor
        .createThumbnail({
          fileUri: remoteFileUrl,
          outputFileName: fileName,
          atTime: 1, // optional, location in the video to create the thumbnail (in seconds)
          width: 100, // optional, width of the thumbnail
          height: 300, // optional, height of the thumbnail
          quality: 80, // optional, quality of the thumbnail (between 1 and 100)
        })
        .then(
          (thumbnail) => {
            this.statusvideo.push({
              downview: remoteFileUrl,
              videoscr: this.getimagesrc(thumbnail),
            });

            if (i == len - 1) {
            } else {
              i++;
              this.createThumb(video, i);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  savedphoto: any[] = [];
  savedtempvideo: any[] = [];
  savedvideo: any[] = [];

  getMediasaved() {
    const root = this.file.externalRootDirectory;

    this.file
      .checkDir(root, 'WStatusSaver')
      .then(() => {
        this.file
          .listDir(root, 'WStatusSaver')
          .then((files) => {
            this.savedphoto.splice(0, this.savedphoto.length);
            this.savedtempvideo.splice(0, this.savedtempvideo.length);
            const mediaMap = files.map(async (media) => {
              let extension = media.name.split('.').pop();

              if (extension === 'mp4') {
                this.savedtempvideo.push(media);
              } else {
                let imagescr = this.getimagesrc(media.nativeURL);
                let downview = media.nativeURL;
                this.savedphoto.push({
                  imagescr: imagescr,
                  downview: downview,
                });
              }
            });
            this.createThumbsaved(this.savedtempvideo, 0);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  createThumbsaved(video, i) {
    let len = video.length;
    if (i == 0) {
      this.savedvideo.splice(0, this.savedvideo.length);
    }

    if (len) {
      var d = new Date();
      let remoteFileUrl = video[i].nativeURL;
      let fileName = d.getTime().toString();

      this.videoEditor
        .createThumbnail({
          fileUri: remoteFileUrl,
          outputFileName: fileName,
          atTime: 1, // optional, location in the video to create the thumbnail (in seconds)
          width: 100, // optional, width of the thumbnail
          height: 300, // optional, height of the thumbnail
          quality: 80, // optional, quality of the thumbnail (between 1 and 100)
        })
        .then(
          (thumbnail) => {
            this.savedvideo.push({
              downview: remoteFileUrl,
              videoscr: this.getimagesrc(thumbnail),
            });

            if (i == len - 1) {
            } else {
              i++;
              this.createThumbsaved(video, i);
            }
          },
          (error) => {}
        );
    }
  }





//todays work first finish this


download(urld, urls) {

      let url = urld.substring(urld.lastIndexOf('/') + 1);
      let extension = urld.split('.').pop();
      const root = this.file.externalRootDirectory;
      let dirctorypath = urld.substring(0, urld.lastIndexOf('/') + 1);

      this.file.resolveDirectoryUrl(root + 'WStatusSaver').then((d) => {
        this.file
          .getFile(d, url, { create: false, exclusive: true })
          .then(() => {
            console.log('exist');
          })
          .catch(() => {
            if (extension == 'mp4') {
              this.savedvideo.push({
                downview: urld,
                videoscr: urls,
              });
            } else {
              this.savedphoto.push({
                imagescr: this.getimagesrc(urld),
                downview: urld,
              });
            }
          });
      });



    this.file.copyFile(dirctorypath, url, this.file.externalRootDirectory + "WStatusSaver", '')
        .then((t) => {
          console.log('saved');
        })
        .catch((err) => {
          console.log(err);
        });


}





//end todays work



























///today



















  public win: any = window;

  getimagesrc(urls) {
    let path = this.win.Ionic.WebView.convertFileSrc(urls);
    return path;  }

  share_with_all_option() {
    var optionshare = {
      message: 'it is best app for indian Railway inquiry ',
      url:
        'https://play.google.com/store/apps/details?id=com.trv.statussaverforwhatsapp',
    };
    this.socialSharing.shareWithOptions(optionshare);
  }

  launchApp(pkg: any) {
    var options: AppLauncherOptions = {
      packageName: pkg,
    };

    this.appLauncher.canLaunch(options).then(
      (launched: Boolean) => {
        if (launched) {
          this.appLauncher.launch(options).then(
            () => {},
            (err) => {
              alert(JSON.stringify(err));
            }
          );
        } else {
          alert('unable to launch');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }




//set and reset modal status
statusofmodal:string="";

togalemodalstatus(status)
{

  this.statusofmodal=status;
  console.log(this.statusofmodal)

}










}
