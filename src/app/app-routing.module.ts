import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './core';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    loadChildren: './views/views.module#ViewsModule',
    canActivate: [GuardService]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: 'client',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    loadChildren: './views/client/client.module#ClientModule'
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
