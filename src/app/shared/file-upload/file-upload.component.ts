import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {HttpService} from '../../core/services';
import {ApiServiceConfig} from '../../core/config';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() config: any;
  @Output() onFileUploadEvent: EventEmitter<any> = new EventEmitter();

  public uploadProgress: any = 0;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
  }

  onChooseFile(files: FileList) {
    const fileToUpload = files.item(0);
    const req = {
      'image': fileToUpload
    };
    this.httpService.httpPostFileUpload(ApiServiceConfig.IMG_API_SERVICE, '', req, null).then((response: any) => {
      if (response && response.status === 1) {
        this.config.image = this.config.imgUrl + response.url;
        this.uploadProgress = 100;
        setTimeout(() => {
          this.uploadProgress = 0;
        }, 1000);
        this.onFileUploadEvent.emit({type: 'uploaded', data: response.url});
      } else {
        this.onFileUploadEvent.emit({type: 'error', data: null});
      }
    }).catch(error => {
      this.onFileUploadEvent.emit({type: 'error', data: error});
    });
  }

  onDeleteImg() {
    this.config.image = null;
    this.onFileUploadEvent.emit({type: 'deleted', data: null});
  }

}
