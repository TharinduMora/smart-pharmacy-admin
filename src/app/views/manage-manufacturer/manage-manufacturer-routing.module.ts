import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageManufacturerComponent} from "./manage-manufacturer.component";
import {ManufacturerComponent} from "./manufacturer/manufacturer.component";

const routes: Routes = [
  {
    path: '',
    component: ManageManufacturerComponent,
    data: {
      title: 'Manufacturer'
    },
    children: [
      { path: 'list', component: ManufacturerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageManufacturerRoutingModule { }
