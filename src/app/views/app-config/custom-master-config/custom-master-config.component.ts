import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { MasterDataService } from "../../../services";
import {CustomMasterConfigFormComponent} from "../custom-master-config-form/custom-master-config-form.component";

@Component({
  selector: 'app-custom-master-config',
  templateUrl: './custom-master-config.component.html',
  styleUrls: ['./custom-master-config.component.css']
})
export class CustomMasterConfigComponent implements OnInit {

  bsModalRef: BsModalRef;

  public domainSelected: any = null;
  public domainList: any = [];
  public masterData: any = {};
  private action: string = 'add';

  constructor(
    private modalSev: BsModalService,
    private masterSev: MasterDataService) {

  }

  ngOnInit() {
    this.getDomains();
  }

  onDomainSelected() {
    // console.log(this.domainSelected);
    this.masterData = {};
    if(this.domainSelected){
      this.getMasterDataByDomainId(this.domainSelected.categoryId || 0);
    }
  }

  onClickAddBtn(){
    this.action = 'add';
    let data: any = {};
    if (this.domainSelected) {
      this.openMasterDataFormModel(data);
    }
  }

  onClickEditKey(data: any){
    // console.log(data);
    this.action = 'edit';
    if (this.domainSelected) {
      this.openMasterDataFormModel(data);
    }
  }

  private getDomains() {
    this.masterSev.getShopCategories().then((response: any) => {
      this.domainList = response;
      // console.log(this.domainList);
    }).catch(error => {});
  }

  private getMasterDataByDomainId(domainId: number) {
    this.masterSev.getMasterData(domainId).then((response: any) => {
      // console.log(response);
      this.masterData = response[0];
      // console.log(this.masterData);
    }).catch(error => {});
  }

  private openMasterDataFormModel(data: any) {

    data.domain = this.domainSelected;
    data.masterDataId = this.domainSelected.categoryId || 0;
    data._id = this.masterData._id || 0;
    data.status = this.masterData.status || 0;

    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalSev.show(CustomMasterConfigFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.data = data;
    this.bsModalRef.content.onClose.subscribe(result => {
      // const response = result;
      // console.log(response);
      if(this.domainSelected){
        this.getMasterDataByDomainId(this.domainSelected.categoryId || 0);
      }
    });
  }

}
