import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageAdminComponent} from './manage-admin.component';
import {AdminListComponent} from './admin-list/admin-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent,
    data: {
      title: 'Brands'
    },
    children: [
      { path: 'list', component: AdminListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
