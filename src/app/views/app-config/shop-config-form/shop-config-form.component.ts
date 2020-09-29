import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ShopService } from "../../../services";
import {ToastService, MsgBoxConfirmComponent} from "../../../core";

@Component({
  selector: 'app-shop-config-form',
  templateUrl: './shop-config-form.component.html',
  styleUrls: ['./shop-config-form.component.css']
})
export class ShopConfigFormComponent implements OnInit {
  msgBoxCofRef: BsModalRef;

  public action: string;
  public data: any = {};
  public onClose: Subject<boolean>;
  public formData: any = {};

  constructor(public bsModalRef: BsModalRef,
              private modalSev: BsModalService,
              private shopSev: ShopService,
              private toastNot: ToastService) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    setTimeout(() => {
      // console.log(this.data);
      if (!this.data.keyObj) {
        this.data.keyObj = {};
      }
      this.formData.key = this.data.keyObj.key;
      this.formData.value = JSON.stringify(this.data.keyObj.value, undefined, 4);
    }, 0);
  }

  onCloseModal() {
    const response: any = {};
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      try {
        let value = JSON.parse(form.value.value);

        let req: any = {
          "shopId": this.data.shopData.shopId || 0,
          "details": this.data.shopData.details || {}
        };

        req.details[this.formData.key] = value;
        // console.log(req);
        this.openMsgBoxCof().then((response: any) => {
          // console.log(response);
          if (response) {
            this.updateShop(req);
          }
        });
      }catch (e) {
        console.log(e);
      }
    }
  }

  private updateShop(req: any){
    this.shopSev.updateShop(req).then((response: any) => {
      if (response) {
        this.toastNot.showSuccess('Successfully updated');
        this.onCloseModal();
      }
    }).catch(error => {});
  }

  private openMsgBoxCof() {
    const modelConfig: any = { class: 'modal-sm', animated: true, keyboard: true, backdrop: true, ignoreBackdropClick: true };
    this.msgBoxCofRef = null;
    this.msgBoxCofRef = this.modalSev.show(MsgBoxConfirmComponent, modelConfig);
    const promise = new Promise((resolve, reject) => {
      return this.msgBoxCofRef.content.onClose.subscribe((response: any) => {
        resolve(response);
      });
    });
    return promise;
  }

}
