import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomMasterConfigComponent} from "./custom-master-config/custom-master-config.component";
import {AppConfigComponent} from "./app-config.component";
import {ShopConfigComponent} from "./shop-config/shop-config.component";
const routes: Routes = [
  {
    path: '',
    component: AppConfigComponent,
    data: {
      title: 'Domain'
    },
    children: [
      { path: 'master-data-config', component: CustomMasterConfigComponent },
      { path: 'shop-config', component: ShopConfigComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppConfigRoutingModule { }
