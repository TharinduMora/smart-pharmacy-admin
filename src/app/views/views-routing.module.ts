import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsComponent } from './views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    data: {
      title: 'Home'
    },
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'domain/manage-domain', loadChildren: './manage-domain/manage-domain.module#ManageDomainModule'},
      {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
      {path: 'domain/custom-master', loadChildren: './custom-master-data/custom-master-data.module#CustomMasterDataModule'},
      {path: 'domain/category', loadChildren: './category/category.module#CategoryModule'},
      {path: 'domain/brand', loadChildren: './product-brand/brand.module#BrandModule'},
      {path: 'admin/manage-shop', loadChildren: './manage-shop/manage-shop.module#ManageShopModule'},
      {path: 'admin/manage-manufacturer', loadChildren: './manage-manufacturer/manage-manufacturer.module#ManageManufacturerModule'},
      {path: 'config/app-config', loadChildren: './app-config/app-config.module#AppConfigModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
