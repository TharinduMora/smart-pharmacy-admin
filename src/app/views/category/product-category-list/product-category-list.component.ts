import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { StaticConfig } from '../../../core';
import { MasterDataService, MasterDataManagementService } from "../../../services";
import { CategoryFormComponent } from "../category-form/category-form.component";

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  bsModalRef: BsModalRef;

  public gridOnChangeTime = new Date().getTime();
  public gridEvent: any = {};
  public gridConfig: any = {};
  private recordList = [];

  public domainSelected: any = null;
  public shopTypeSelected: any = null;
  public domainList: any = [];
  public shopTypeList: any = [];

  public staticConfig = StaticConfig;
  private productCategoryTypeList = [];
  private shopCategories= [];
  public categoryDetails = {};

  private action = null;

  constructor(
    private modalService: BsModalService,
    private masterSev: MasterDataService,
    private masterMgtSev: MasterDataManagementService) { }

  ngOnInit() {
    this.shopTypeList = StaticConfig.SHOP_TYPES;
    this.shopTypeSelected = this.shopTypeList[0];
    this.initGridConfig();
    this.getDomains();
  }

  onChangeDomain() {
    // console.log(this.domainSelected);
    if(this.domainSelected){
      this.getMasterDataByDomainId(this.domainSelected.categoryId || 0).then((response: any) => {
        this.initDataGrid();
      }).catch(error => {});
    }else{
      this.gridConfig.records = [];
    }
  }

  private initDataGrid(){
    this.initGridConfig();
    this.gridConfig.apiSev = this.masterSev;
    this.gridConfig.searchParameters = [{
      "key":"shopCategoryId",
      "value":this.domainSelected.categoryId || 0,
      "operator":"eq"
    }];
    this.onCallGridEven('refresh', {});
  }

  onClickAddBtn() {
    this.action = 'add';
    this.categoryDetails = {};
    this.openProductCategoryModel();
  }

  onUpdateStatus(statusDetails, status) {
    for (let i = 0; i < this.recordList.length; i++) {
      if (this.recordList[i].check) {
        this.updateStatus(this.gridConfig.records[i], statusDetails.ID);
      }
    }
  }

  private openProductCategoryModel() {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(CategoryFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.categoryFormType = 'PRODUCT';
    this.bsModalRef.content.shopType = this.shopTypeSelected || {};
    this.bsModalRef.content.shopDomain = this.domainSelected || {};
    this.bsModalRef.content.categoryTypeList = this.productCategoryTypeList || [];
    this.bsModalRef.content.data = Object.assign({}, this.categoryDetails || {});
    this.bsModalRef.content.onClose.subscribe(response => {
      // console.log(response);
      if (this.action === 'edit') {
        if(response.categoryId){
          this.onCallGridEven('edit', response);
        }
      }else{
        this.initDataGrid();
      }
    });
  }

  onGridActionEvent($event) {
    // console.log($event);
    switch ($event.action) {
      case 'edit': {
        this.action = 'edit';
        this.categoryDetails = $event.record;
        this.openProductCategoryModel();
        break;
      }
      case 'check': {
        this.recordList = $event.record || [];
        break;
      }
      default: {
        break;
      }
    }
  }

  private onCallGridEven(event: string, data: any) {
    this.gridOnChangeTime = new Date().getTime();
    this.gridEvent.event = event;
    this.gridEvent.data = data;
    // console.log(this.gridEvent);
  }

  private initGridConfig() {

    let statusFilterOptions = [
      { key: StaticConfig.STATUS_LIST.CREATED.ID, value: StaticConfig.STATUS_LIST.CREATED.NAME },
      { key: StaticConfig.STATUS_LIST.PENDING.ID, value: StaticConfig.STATUS_LIST.PENDING.NAME },
      { key: StaticConfig.STATUS_LIST.APPROVED.ID, value: StaticConfig.STATUS_LIST.APPROVED.NAME },
      { key: StaticConfig.STATUS_LIST.SUSPENDED.ID, value: StaticConfig.STATUS_LIST.SUSPENDED.NAME },
      { key: StaticConfig.STATUS_LIST.DELETED.ID, value: StaticConfig.STATUS_LIST.DELETED.NAME }
    ];
    let statusDisplayCondition = [];
    for (let key in StaticConfig.STATUS_LIST || {}){
      statusDisplayCondition.push({
        key: StaticConfig.STATUS_LIST[key].ID,
        value: StaticConfig.STATUS_LIST[key].NAME,
        style: { color: StaticConfig.STATUS_LIST[key].COLOR}
      });
    }

    this.gridConfig = {
      'apiSev': null,
      'sevFunction': 'categoryFindByCriteria',
      'apiParameters': {
        'statuses' : [
          StaticConfig.STATUS_LIST.CREATED.ID,
          StaticConfig.STATUS_LIST.PENDING.ID,
          StaticConfig.STATUS_LIST.APPROVED.ID,
          StaticConfig.STATUS_LIST.SUSPENDED.ID,
          StaticConfig.STATUS_LIST.DELETED.ID
        ]
      },
      'searchParameters': [],
      'primaryKey': 'categoryId',
      'pagination' : {
        'maxSize' : 5,
        'itemsPerPage' : 15
      },
      'waitingHttpSve' : false,
      'columns': [],
      'records': []
    };

    this.gridConfig.columns.push({
      'name': '',
      'key': 'checkbox',
      'columnType': 'checkbox',
      'headerClass': 'text-center',
      'headerStyle': {},
      'dataStyle': {'text-align': 'center'},
      'width': 30
    });
    this.gridConfig.columns.push({
      'name': 'ID',
      'key': 'categoryId',
      'columnType': 'data',
    });
    this.gridConfig.columns.push({
      'name': 'Shop Type',
      'key': 'shopTypeId',
      'headerClass': 'text-center',
      'dataDisplayCondition': this.shopTypeList,
      'dataType': 'number',
      'dataStyle': {'text-align': 'center', 'font-weight': 600}
    });
    this.gridConfig.columns.push({
      'name': 'Shop Domain',
      'key': 'shopCategoryId',
      'headerClass': 'text-center',
      'dataDisplayCondition': this.shopCategories || [],
      'dataType': 'number',
      'dataStyle': {'text-align': 'center', 'font-weight': 600}
    });
    this.gridConfig.columns.push({
      'name': 'Data Type',
      'key': 'dataType',
      'headerClass': 'text-center',
      'dataDisplayCondition': [{key: 1, value: 'LIST'}, {key: 2, value: 'FREE TEXT'}],
      'dataStyle': {'text-align': 'center', 'font-weight': 600}
    });
    this.gridConfig.columns.push({
      'name': 'Category Type',
      'key': 'type',
      'headerClass': 'text-center',
      'filter': true,
      'filterConfig': {
        'operators': {
          'eq': true
        },
        'defaultOperator': 'eq',
        'type': 'option',
        'options': this.productCategoryTypeList || [],
      },
      'dataDisplayCondition': this.productCategoryTypeList || [],
      'dataStyle': {'text-align': 'center', 'font-weight': 600}
    });
    this.gridConfig.columns.push({
      'name': 'Is Parent',
      'key': 'parent',
      'filter': true,
      'filterConfig': {
        'operators': {
          'eq': true
        },
        'defaultOperator': 'eq'
      },
      'dataType': 'boolean'
    });
    this.gridConfig.columns.push({
      'name': 'Parent Category',
      'key': 'parentCategoryId'
    });
    this.gridConfig.columns.push({
      'name': 'Value',
      'key': 'value',
      'filter': true,
      'filterConfig': {
        'operators': {
          'like': true
        },
        'defaultOperator': 'like'
      },
      'dataStyle': {'text-align': 'left'}
    });
    this.gridConfig.columns.push({
      'name': 'Status',
      'key': 'status',
      'headerClass': 'text-center',
      'filter': true,
      'filterConfig': {
        'operators': {
          'eq': true
        },
        'defaultOperator': 'eq',
        'type': 'option',
        'options': statusFilterOptions
      },
      'dataDisplayCondition': statusDisplayCondition,
      'dataType': 'number',
      'dataStyle': {'text-align': 'center', 'font-weight': 600},
      'width': 150
    });
    this.gridConfig.columns.push({
      'columnType': 'button',
      'buttonConfig': {
        'action': 'edit',
        'name': 'Edit',
        'class': 'btn-primary',
        'icon': 'fas fa-edit',
        'disabledCondition': {
          'key': 'status',
          'values': [3]
        }
      },
      'width': 35
    });
  }

  private updateStatus (record, StatusId) {
    const req = {
      'primaryId': record.categoryId,
      'status': StatusId
    };
    this.masterMgtSev.updateCategoryStatus(req).then((response: any) => {
      // console.log(response);
      const data = {
        'categoryId': response.id,
        'status': StatusId
      };
      this.onCallGridEven('edit', data);
    }).catch((error: any) => {});
  }

  private getDomains() {
    this.masterSev.getShopCategories().then((response: any) => {
      this.domainList = response;
      response.forEach((obj: any) => {
        const shopCategory = {
          'key': obj.categoryId,
          'value': obj.name
        };
        this.shopCategories.push(shopCategory);
      });
      // console.log(this.domainList);
    }).catch(error => {});
  }

  private getMasterDataByDomainId(domainId: number) {
    const promise = new Promise((resolve, reject) => {
      return this.masterSev.getMasterData(domainId)
        .then((response: any) => {
          // console.log(response);
          this.productCategoryTypeList = response[0].product_category_type || [];
          resolve();
        }).catch((error: any) => {
          reject();
        });
    });
    return promise;
  }

}
