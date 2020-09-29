import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { NewBrandFormComponent } from './new-brand-form/new-brand-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DataGridModule, FileUploadModule } from './../../core';

@NgModule({
  imports: [
    CommonModule,
    BrandRoutingModule,
    ModalModule.forRoot(), FormsModule,
    TabsModule,
    DataGridModule,
    FileUploadModule,
    NgSelectModule,
    DataGridModule
  ],
  declarations: [BrandComponent, BrandListComponent, NewBrandFormComponent],
  entryComponents: [ NewBrandFormComponent ]
})
export class BrandModule { }
