import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeysPipe} from './keys.pipe';
import {FilterEntitlementPipe} from './filter.pipe';
import {StatusPipe} from './status.pipe';
import {StatusColorPipe} from './status.color.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [KeysPipe, FilterEntitlementPipe, StatusPipe, StatusColorPipe],
  exports: [KeysPipe, FilterEntitlementPipe, StatusPipe, StatusColorPipe]
})
export class PipeModule {
}
