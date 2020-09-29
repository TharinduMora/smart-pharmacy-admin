import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDomainComponent } from './manage-domain.component';
import { DomainComponent } from './domain/domain.component';

const routes: Routes = [
  {
    path: '',
    component: ManageDomainComponent,
    data: {
      title: 'Domain'
    },
    children: [
      { path: 'list', component: DomainComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDomainRoutingModule { }
