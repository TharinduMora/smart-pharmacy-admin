import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ManageShopRoutingModule } from './manage-shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ShopEntitlementsFormComponent } from './shop-entitlements-form/shop-entitlements-form.component';
import { ManageShopComponent } from './manage-shop.component';
import { PipeModule, DataGridModule } from './../../core';
import {ShopFormComponent} from "./shop-form/shop-form.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ManageShopRoutingModule,
    PipeModule,
    DataGridModule,
    NgSelectModule
  ],
  declarations: [ShopComponent, ManageShopComponent, ShopEntitlementsFormComponent, ShopFormComponent],
  entryComponents: [
    ShopEntitlementsFormComponent, ShopFormComponent
  ]
})
export class ManageShopModule { }
