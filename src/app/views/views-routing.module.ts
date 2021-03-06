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
      {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
      {path: 'shop', loadChildren: './shop/shop.module#ShopModule'},
      {path: 'product', loadChildren: './product/product.module#ProductModule'},
      {path: 'my-account', loadChildren: './my-account/my-account.module#MyAccountModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
