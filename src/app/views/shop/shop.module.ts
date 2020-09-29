import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import {ComTabModule} from '../../core/com-tab/com-tab.module';
import { ShopListComponent } from './shop-list/shop-list.component';

@NgModule({
  imports: [
    CommonModule,
    ComTabModule,
    ShopRoutingModule
  ],
  declarations: [ShopListComponent]
})
export class ShopModule { }
