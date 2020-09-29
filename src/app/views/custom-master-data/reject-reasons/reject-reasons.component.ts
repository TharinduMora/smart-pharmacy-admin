import { Component, OnInit } from '@angular/core';
import * as CloneDeep from 'lodash/CloneDeep';

import {ToastService} from '../../../core';
import {MasterDataService, MasterDataManagementService} from '../../../services';

@Component({
  selector: 'app-reject-reasons',
  templateUrl: './reject-reasons.component.html',
  styleUrls: ['./reject-reasons.component.css']
})
export class RejectReasonsComponent implements OnInit {

  public masterData: any = {};
  public rejectReasons: any = [];
  public domains = [];
  public rejectReason = '';
  public masterDataId = 0;

  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private toastNot: ToastService
  ) {
  }

  ngOnInit() {
    this.getMasterDataCategories();
  }

  private getMasterDataCategories() {
    this.masterService.getShopCategories().then((response: any) => {
      this.domains = response;
    }).catch(error => {});
  }

  getRejectReasons(masterDataId) {
    this.rejectReasons = [];
    if (masterDataId !== null) {
      this.masterService.getMasterData(masterDataId).then((response: any) => {
        if (response.length !== 0) {
          this.masterData = CloneDeep(response[0]);
          if (typeof response[0].reject_reasons === 'undefined') {
            this.rejectReasons = [];
          } else {
            this.rejectReasons = response[0].reject_reasons;
          }
        } else {
          this.masterData = {};
          this.rejectReasons = [];
        }
      }).catch(error => {});
    }
  }

  addRejectReason() {
    this.rejectReasons.push(this.rejectReason);
    this.rejectReason = '';
  }

  removeRejectReason(index) {
    this.rejectReasons.splice(index, 1);
  }

  onClickReset() {
    this.rejectReasons = CloneDeep(this.masterData.reject_reasons);
  }

  onClickSave() {
    if (typeof(this.masterData._id) === 'undefined') {
      const req = {
        'masterDataId': this.masterDataId,
        'reject_reasons': this.rejectReasons,
        'status': 2
      };
      this.masterMngService.addNewMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.showSuccess('Master Data Succesfully Added');
          this.getRejectReasons(this.masterDataId);
        }
      }).catch(error => {});
    } else {
      const req = {
        'masterDataId': this.masterDataId,
        'reject_reasons': this.rejectReasons,
        'status': this.masterData.status,
        '_id': this.masterData._id
      };
      this.masterMngService.updateMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.showSuccess('Master Data Successfully Updated');
        }
      }).catch(error => {});

    }
  }

}
