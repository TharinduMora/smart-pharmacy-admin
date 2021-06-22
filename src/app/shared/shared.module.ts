import { FormsModule } from '@angular/forms';
import { MapComponent } from "./map/map.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { StatusUpdateComponent } from "./status-update/status-update.component";
import { AgmCoreModule } from "@agm/core";
import { CustomMapComponent } from "./custom-map/custom-map.component";
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCkxQ0D7vO9X7nUn9KokASdMCzFcVwTgrY",
      // apiKey: 'AIzaSyAjp4drz3dgzgxUfqHja-noN_Ct228M33Q',
      libraries: ["places", "geocoder", "geometry"],
    }),
    AgmSnazzyInfoWindowModule
  ],
  // apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
  declarations: [
    FileUploadComponent,
    StatusUpdateComponent,
    MapComponent,
    CustomMapComponent,
  ],
  exports: [
    FileUploadComponent,
    StatusUpdateComponent,
    MapComponent,
    CustomMapComponent,
  ],
})
export class SharedModule {}
