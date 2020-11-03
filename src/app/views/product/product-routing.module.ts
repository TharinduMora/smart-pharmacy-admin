import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ComTabComponent} from '../../core/com-tab/com-tab.component';
import {AdminListComponent} from '../admin/admin-list/admin-list.component';
import {AdminViewComponent} from '../admin/admin-view/admin-view.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductViewComponent} from './product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: ComTabComponent,
    data: {
      title: 'Product Management',
      rootPath: '/product',
      tabList: [
        {
          title: 'Product List',
          functions: ['FIND_PRODUCT_BY_CRITERIA'],
          active: false,
          route: '/list'
        }
      ]
    },
    children: [
      {path: 'list', component: ProductListComponent},
      {path: 'view', component: ProductViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
