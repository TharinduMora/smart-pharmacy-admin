import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { StatusUpdateComponent } from './status-update/status-update.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCkxQ0D7vO9X7nUn9KokASdMCzFcVwTgrY',
      libraries: ['places', 'geocoder', 'geometry']
    }),
  ],
  // apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
  declarations: [FileUploadComponent, StatusUpdateComponent, MapComponent],
  exports: [FileUploadComponent, StatusUpdateComponent, MapComponent]
})
export class SharedModule {
}
