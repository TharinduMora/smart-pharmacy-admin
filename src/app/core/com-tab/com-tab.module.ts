import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComTabComponent} from './com-tab.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    RouterModule
  ],
  declarations: [ComTabComponent],
  exports: [ComTabComponent]
})
export class ComTabModule {
}
