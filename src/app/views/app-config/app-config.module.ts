import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { AppConfigRoutingModule } from './app-config-routing.module';
import { CustomMasterConfigComponent } from './custom-master-config/custom-master-config.component';
import { CustomMasterConfigFormComponent } from './custom-master-config-form/custom-master-config-form.component';
import { AppConfigComponent } from './app-config.component';
import { PipeModule} from './../../core';
import { ShopConfigComponent } from './shop-config/shop-config.component';
import { ShopConfigFormComponent } from './shop-config-form/shop-config-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AppConfigRoutingModule
  ],
  declarations: [CustomMasterConfigComponent, CustomMasterConfigFormComponent, AppConfigComponent, ShopConfigComponent, ShopConfigFormComponent],
  entryComponents: [
    CustomMasterConfigFormComponent, ShopConfigFormComponent
  ]
})
export class AppConfigModule { }
