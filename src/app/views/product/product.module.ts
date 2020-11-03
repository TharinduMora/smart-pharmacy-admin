import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {ComTabModule} from '../../core/com-tab/com-tab.module';
import {PipeModule} from '../../core/pipe';
import {FormsModule} from '@angular/forms';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  imports: [
    CommonModule,
    ComTabModule,
    PipeModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgSelectModule,
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [ProductListComponent, ProductViewComponent],
  entryComponents: [ProductViewComponent]
})
export class ProductModule { }
