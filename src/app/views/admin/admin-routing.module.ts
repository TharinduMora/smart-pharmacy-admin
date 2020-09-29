import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminListComponent} from './admin-list/admin-list.component';
import {ComTabComponent} from '../../core/com-tab/com-tab.component';
import {AdminViewComponent} from './admin-view/admin-view.component';

const routes: Routes = [
  {
    path: '',
    component: ComTabComponent,
    data: {
      title: 'Admin Management',
      rootPath: '/admin',
      tabList: [
        {
          title: 'Admin List',
          functions: ['FIND_ADMIN_BY_CRITERIA'],
          active: false,
          route: '/list'
        },
        {
          title: 'Admin View',
          functions: ['VIEW_ADMIN_DETAILS'],
          active: false,
          route: '/view'
        }
      ]
    },
    children: [
      {path: 'list', component: AdminListComponent},
      {path: 'view', component: AdminViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
