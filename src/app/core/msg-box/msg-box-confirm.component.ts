import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-msg-box-confirm',
  templateUrl: './msg-box-confirm.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxConfirmComponent implements OnInit {

  public onClose: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    // setTimeout(() => {}, 0);
  }

  onCloseModal() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  onClickYes() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  onClickNo() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
