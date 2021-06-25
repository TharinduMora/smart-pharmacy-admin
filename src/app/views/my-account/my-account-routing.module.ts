import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComTabComponent} from '../../core/com-tab/com-tab.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {MyShopComponent} from './my-shop/my-shop.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [
  {
    path: 'user-profile',
    component: ComTabComponent,
    data: {
      title: 'My Profile Management',
      rootPath: '/my-account/user-profile',
      tabList: [
        {
          title: 'My Profile Management',
          functions: ['DEFAULT'],
          active: true,
          route: '/profile-details'
        }
      ]
    },
    children: [
      {path: 'profile-details', component: MyProfileComponent}
    ]
  },
  {
    path: 'user-shop',
    component: ComTabComponent,
    data: {
      title: 'Pharmacy Management',
      rootPath: '/my-account/user-shop',
      tabList: [
        {
          title: 'My Pharmacy Management',
          functions: ['DEFAULT'],
          active: true,
          route: '/shop-details'
        }
      ]
    },
    children: [
      {path: 'shop-details', component: MyShopComponent}
    ]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
