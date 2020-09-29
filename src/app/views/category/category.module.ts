import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ServiceCategoryListComponent } from './service-category-list/service-category-list.component';
import { DataGridModule, FileUploadModule } from './../../core';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    DataGridModule,
    FileUploadModule,
    NgSelectModule
  ],
  declarations: [CategoryComponent, ProductCategoryListComponent, ServiceCategoryListComponent, CategoryFormComponent],
  entryComponents: [
    CategoryFormComponent
  ]
})
export class CategoryModule { }
