import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../../service/download.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private downloadService:DownloadService) { }

  ngOnInit() {
  }

  share()
{
  this.downloadService.share_with_all_option();
}
}
