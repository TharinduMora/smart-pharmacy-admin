import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

import {MasterDataManagementService, MasterDataService} from "../../../services";
import {GlobalVariable, ToastService, MsgBoxConfirmComponent} from "../../../core";

@Component({
  selector: 'app-custom-master-config-form',
  templateUrl: './custom-master-config-form.component.html',
  styleUrls: ['./custom-master-config-form.component.css']
})
export class CustomMasterConfigFormComponent implements OnInit {
  msgBoxCofRef: BsModalRef;

  public action: string;
  public data: any = {};
  public onClose: Subject<boolean>;
  public formData: any = {};

  constructor(public bsModalRef: BsModalRef,
              private modalSev: BsModalService,
              private masterSev: MasterDataService,
              private masMngSev: MasterDataManagementService,
              private toastNot: ToastService,
              private gVariable: GlobalVariable) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    setTimeout(() => {
      // console.log(this.data);
      this.formData.key = this.data.key;
      this.formData.value = JSON.stringify(this.data.value, undefined, 4);
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
          "masterDataId": this.data.masterDataId
        };
        req[this.formData.key] = value;

        this.openMsgBoxCof().then((response: any) => {
          // console.log(response);
          if (response) {
            if (this.data._id > 0) {
              req._id = this.data._id;
              this.updateMaster(req);
            }else{
              req.status = 2;
              this.addMaster(req);
            }
          }
        });

        // console.log(req);
      }catch (e) {
        console.log(e);
      }
    }
  }

  private addMaster(req: any){
    this.masMngSev.addNewMasterData(req).then((response: any) => {
      if (response) {
        this.toastNot.showSuccess('Successfully added');
        this.onCloseModal();
      }
    }).catch(error => {});
  }

  private updateMaster(req: any){
    this.masMngSev.updateMasterData(req).then((response: any) => {
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
