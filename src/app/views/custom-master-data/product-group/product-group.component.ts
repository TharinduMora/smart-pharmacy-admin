import { Component, OnInit } from '@angular/core';
import * as CloneDeep from 'lodash/CloneDeep';

import {ToastService} from '../../../core';
import {MasterDataService, MasterDataManagementService} from '../../../services';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  public masterData: any = {};
  public productGroups: any = {};
  public domains = [];
  public record: any = {
    'key': '',
    'value': {'name': ''}
  };
  public existingKey = false;
  public masterDataId = 0;


  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private toastNot: ToastService
  ) {}

  ngOnInit() {
    this.getMasterDataCategories();
  }

  private getMasterDataCategories() {
    this.masterService.getShopCategories().then((response: any) => {
      this.domains = response;
    }).catch(error => {});
  }

  getProductGroups(masterDataId) {
    this.productGroups = {};
    if (masterDataId !== null) {
      this.masterService.getMasterData(masterDataId).then((response: any) => {
        if (response.length !== 0) {
          this.masterData = CloneDeep(response[0]);
          if (typeof response[0].product_groups === 'undefined') {
            this.productGroups = {};
          } else {
            this.productGroups = response[0].product_groups;
          }
        } else {
          this.masterData = {};
          this.productGroups = {};
        }
      }).catch(error => {});
    }
  }

  removeGroup(key) {
    delete this.productGroups[key];
    this.productGroups = CloneDeep(this.productGroups);
  }

  onClickSave() {
    this.productGroups = this.getFinalProductGroups(this.productGroups);
    if (typeof(this.masterData._id) === 'undefined') {
      const req = {
        'masterDataId': this.masterDataId,
        'product_groups': this.productGroups,
        'status': 2
      };
      this.masterMngService.addNewMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.showSuccess('Product Group Successfully Added');
          this.getProductGroups(this.masterDataId);
        }
      }).catch(error => {});
    } else {
      const req = {
        'masterDataId': this.masterDataId,
        'product_groups': this.productGroups,
        'status': this.masterData.status,
        '_id': this.masterData._id
      };
      this.masterMngService.updateMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.showSuccess('Product Groups Successfully Updated');
          this.getProductGroups(this.masterDataId);
        }
      }).catch(error => {});

    }
  }

  onClickReset() {
    this.productGroups = CloneDeep(this.masterData.product_groups);
  }

  onChangeKeyCheckDuplicate(key) {
    if (this.productGroups.hasOwnProperty(key)) {
      this.existingKey = true;
    }else {
      this.existingKey = false;
    }
  }

  addProductGroup(key, value) {
    if (!this.existingKey) {
      const prodVal = {'name': value.name};
      this.productGroups[key] = prodVal;
      this.productGroups = CloneDeep(this.productGroups);
      this.record.key = '';
      this.record.value.name = '';
    }

  }

  private getFinalProductGroups(productGroups) {
    const groupkeys = Object.keys(productGroups);
    for (const group of groupkeys) {
      if (productGroups[group].hasOwnProperty('edit')) {
        delete productGroups[group]['edit'];
      }
    }
    return productGroups;
  }

}
