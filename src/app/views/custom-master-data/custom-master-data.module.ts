import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PipeModule } from './../../core';
import { CustomMasterDataRoutingModule } from './custom-master-data-routing.module';
import { CustomMasterDataComponent } from './custom-master-data.component';
import { RejectReasonsComponent } from './reject-reasons/reject-reasons.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { ProductGroupComponent } from './product-group/product-group.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMasterDataRoutingModule,
    FormsModule,
    PipeModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgSelectModule
  ],
  declarations: [CustomMasterDataComponent, RejectReasonsComponent, MeasurementUnitComponent, ProductGroupComponent]
})
export class CustomMasterDataModule { }
