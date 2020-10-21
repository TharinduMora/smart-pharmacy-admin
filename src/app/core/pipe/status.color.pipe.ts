import {Pipe, PipeTransform} from '@angular/core';
import {StaticConfig} from '../config';

@Pipe({
  name: 'statusColorPipe'
})
export class StatusColorPipe implements PipeTransform {
  transform(statusId: number): String {
    let statusString = 'black';
    Object.keys(StaticConfig.STATUS_LIST).forEach((KEY) => {
      if (StaticConfig.STATUS_LIST[KEY].ID === statusId) {
        statusString = StaticConfig.STATUS_LIST[KEY].COLOR;
      }
    });
    return statusString;
  }
}
