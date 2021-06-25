import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ComTabComponent} from '../../core/com-tab/com-tab.component';
import {ShopListComponent} from './shop-list/shop-list.component';

const routes: Routes = [
  {
    path: '',
    component: ComTabComponent,
    data: {
      title: 'Pharmacy Management',
      rootPath: '/shop',
      tabList: [
        {
          title: 'Pharmacy List',
          functions: ['FIND_SHOP_BY_CRITERIA'],
          active: false,
          route: '/list'
        }
      ]
    },
    children: [
      {path: 'list', component: ShopListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
