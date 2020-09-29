import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ShopService } from "../../../services";
import { StaticConfig } from "../../../core";
import {ShopConfigFormComponent} from "../shop-config-form/shop-config-form.component";

@Component({
  selector: 'app-shop-config',
  templateUrl: './shop-config.component.html',
  styleUrls: ['./shop-config.component.css']
})
export class ShopConfigComponent implements OnInit {

  bsModalRef: BsModalRef;

  public shopSelected: any = null;
  public shopList: any = [];
  public shopData: any = {};
  public additionalData: any = {};
  private action: string = 'add';

  constructor(
    private modalSev: BsModalService,
    private shopSev: ShopService) {

  }

  ngOnInit() {
    this.getShopList();
  }

  onClickAddBtn(){
    this.action = 'add';
    let data: any = {};
    if (this.shopSelected) {
      this.openShopConfigFormModel(data);
    }
  }

  onShopSelected() {
    // console.log(this.domainSelected);
    this.shopData = {};
    this.additionalData = {};
    if(this.shopSelected){
      this.getShopById(this.shopSelected.shopId || 0);
    }
  }

  onClickEditKey(keyObj: any){
    // console.log(keyObj);
    this.action = 'edit';
    if (this.shopSelected) {
      let data: any = {};
      data.keyObj = keyObj;
      this.openShopConfigFormModel(data);
    }
  }

  private getShopList() {
    let req = {
      "offset":0,
      "limit":9999,
      "orderByKey":"shopId",
      "statuses":[
        StaticConfig.STATUS_LIST.PENDING.ID,
        StaticConfig.STATUS_LIST.APPROVED.ID,
        StaticConfig.STATUS_LIST.SUSPENDED.ID
      ]
    };

    this.shopSev.shopAllFindByCriteria(req).then((response: any) => {
      // console.log(response);
      this.shopList = response.data || [];
    }).catch(error => {});
  }

  private getShopById(id: number) {
    this.shopSev.getShopDetailsById(id).then((response: any) => {
      // console.log(response);
      this.shopData = response.data[0] || {};
      this.additionalData = this.shopData.details || {};
    }).catch(error => {});
  }

  private openShopConfigFormModel(data: any) {
    data.shopData = this.shopData;

    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalSev.show(ShopConfigFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.data = data;
    this.bsModalRef.content.onClose.subscribe(result => {
      // console.log(response);
      if(this.shopSelected){
        this.getShopById(this.shopSelected.shopId || 0);
      }
    });
  }

}
