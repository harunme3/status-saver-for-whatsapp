import { Injectable } from '@angular/core';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root',
})
export class DownloaddualService {
  constructor(
    public file: File,

    private videoEditor: VideoEditor,
    private socialSharing: SocialSharing
  ) {}

  statusphoto: any[] = [];
  statustempvideos: any[] = [];
  statusvideo: any[] = [];

  getMedia(root, dirctory, path) {
    this.file
      .checkDir(root, dirctory)
      .then(() => {
        this.file
          .listDir(root, path)
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

  public win: any = window;

  getimagesrc(urls) {
    let path = this.win.Ionic.WebView.convertFileSrc(urls);
    return path;
  }

  share_with_all_option() {
    var optionshare = {
      message: 'it is best app for indian Railway inquiry ',
      url:
        'https://play.google.com/store/apps/details?id=com.trv.statussaverforwhatsapp',
    };
    this.socialSharing.shareWithOptions(optionshare);
  }
}
