import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {StatusUpdateComponent} from './status-update/status-update.component';

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [FileUploadComponent, StatusUpdateComponent],
  exports: [FileUploadComponent, StatusUpdateComponent]
})
export class SharedModule {
}
