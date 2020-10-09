import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StaticConfig} from '../../core/config';

@Component({
  selector: 'app-status-update-btn',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit {

  @Input() isEnable: false;
  @Input() statusString: string;
  @Output() onClickStatus: EventEmitter<any> = new EventEmitter();

  currentStatus: any;

  constructor() {
  }

  ngOnInit() {
    Object.keys(StaticConfig.STATUS_LIST).forEach((key) => {
      if (key === this.statusString) {
        this.currentStatus = StaticConfig.STATUS_LIST[key];
      }
    });
    if (!this.currentStatus) {
      console.error('Cannot find Status Named ' + this.statusString);
      this.isEnable = false;
    }
  }

  onClickStatusBtn() {
    this.onClickStatus.emit({action: 'status-update', data: this.currentStatus.ID});
  }

}
