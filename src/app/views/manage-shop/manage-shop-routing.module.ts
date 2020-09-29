import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageShopComponent } from './manage-shop.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: ManageShopComponent,
    data: {
      title: 'Shop'
    },
    children: [
      { path: 'list', component: ShopComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageShopRoutingModule { }
