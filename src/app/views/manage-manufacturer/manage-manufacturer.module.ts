import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PipeModule, DataGridModule, FileUploadModule } from './../../core';
import { ManageManufacturerRoutingModule } from './manage-manufacturer-routing.module';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { ManageManufacturerComponent } from './manage-manufacturer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PipeModule,
    DataGridModule,
    FileUploadModule,
    NgSelectModule,
    ManageManufacturerRoutingModule
  ],
  declarations: [ManufacturerComponent, ManufacturerFormComponent, ManageManufacturerComponent],
  entryComponents: [ ManufacturerFormComponent ]
})
export class ManageManufacturerModule { }
