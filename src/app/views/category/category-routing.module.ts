import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductCategoryListComponent} from "./product-category-list/product-category-list.component";
import {ServiceCategoryListComponent} from "./service-category-list/service-category-list.component";
import {CategoryComponent} from "./category.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: 'Domain'
    },
    children: [
      { path: 'product', component: ProductCategoryListComponent },
      { path: 'service', component: ServiceCategoryListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
