import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductGroupComponent} from "./product-group/product-group.component";
import {CustomMasterDataComponent} from "./custom-master-data.component";
import {RejectReasonsComponent} from "./reject-reasons/reject-reasons.component";
import {MeasurementUnitComponent} from "./measurement-unit/measurement-unit.component";

const routes: Routes = [
  {
    path: '',
    component: CustomMasterDataComponent,
    data: {
      title: 'Domain'
    },
    children: [
      { path: 'product-group', component: ProductGroupComponent },
      { path: 'reject-reason', component: RejectReasonsComponent },
      { path: 'measurement-unit', component: MeasurementUnitComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomMasterDataRoutingModule { }
