import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import {ComTabModule} from '../../core/com-tab/com-tab.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import {PipeModule} from '../../core/pipe';
import {FormsModule} from '@angular/forms';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {FileUploadModule} from '../../core/file-upload';
import { ShopViewComponent } from './shop-view/shop-view.component';

@NgModule({
  imports: [
    CommonModule,
    ComTabModule,
    ShopRoutingModule,
    PipeModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgSelectModule,
    FileUploadModule
  ],
  declarations: [ShopListComponent, ShopViewComponent],
  entryComponents: [ShopViewComponent]
})
export class ShopModule { }
