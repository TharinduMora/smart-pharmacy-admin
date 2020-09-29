import {Component, OnInit} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {StaticConfig} from '../../../core';
import {MasterDataService, ShopService} from '../../../services';
import {ShopEntitlementsFormComponent} from '../shop-entitlements-form/shop-entitlements-form.component';
import {ShopFormComponent} from "../shop-form/shop-form.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
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
  private action = null;

  constructor(private masterSev: MasterDataService, private modalService: BsModalService, private shopSev: ShopService) { }

  ngOnInit() {
    this.shopTypeList = StaticConfig.SHOP_TYPES;
    this.shopTypeSelected = this.shopTypeList[0];
    this.getDomains();
    this.initGridConfig();
  }

  onUpdateStatus(statusDetails, status) {
    for (let i = 0; i < this.recordList.length; i++) {
      if (this.recordList[i].check) {
        this.updateStatus(this.gridConfig.records[i], statusDetails.ID);
      }
    }
  }

  onGridActionEvent($event) {
    // console.log($event);
    switch ($event.action) {
      case 'edit_ent': {
        this.openShopEntitlementsModel($event.record);
        break;
      }
      case 'edit': {
        this.action = 'edit';
        let shop = $event.record || {};
        shop.shopType = this.shopTypeSelected.id;
        shop.shopCategory = this.domainSelected.categoryId;
        shop.shopCategoryName = this.domainSelected.name;
        this.openShopFormModel(shop);
        break;
      }
      case 'view': {
        this.action = 'view';
        let shop = $event.record || {};
        shop.shopType = this.shopTypeSelected.id;
        shop.shopCategory = this.domainSelected.categoryId;
        shop.shopCategoryName = this.domainSelected.name;
        this.openShopFormModel(shop);
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

  onChangeDomain() {
    // console.log(this.domainSelected);
    if(this.domainSelected){
      this.initDataGrid();
    }else{
      this.gridConfig.records = [];
    }
  }

  onClickAddBtn() {
    this.action = 'add';
    let shop = {
      shopType : this.shopTypeSelected.id,
      shopCategory : this.domainSelected.categoryId,
      shopCategoryName : this.domainSelected.name
    };
    this.openShopFormModel(shop);
  }

  private initDataGrid(){
    this.initGridConfig();
    this.gridConfig.apiSev = this.shopSev;
    this.gridConfig.searchParameters = [{
      "key":"shopCategory",
      "value":this.domainSelected.categoryId || 0,
      "operator":"eq"
    }];
    this.onCallGridEven('refresh', {});
  }

  private openShopFormModel(data: any) {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(ShopFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.shopData = data;
    this.bsModalRef.content.onClose.subscribe(result => {
      // console.log(result);
      if(this.action === 'add' && result.shopId > 0) {
        this.onCallGridEven('add', result);
      }
    });
  }

  private openShopEntitlementsModel(data: any) {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(ShopEntitlementsFormComponent, modelConfig);
    this.bsModalRef.content.action = "map-entitlements";
    this.bsModalRef.content.data = data;
    this.bsModalRef.content.onClose.subscribe(result => {
      // console.log(result);
    });
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
      'sevFunction': 'shopAllFindByCriteria',
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
      'primaryKey': 'shopId',
      'pagination' : {
        'maxSize' : 5,
        'itemsPerPage' : 15
      },
      'waitingHttpSve' : false,
      'columns': [],
      'records': []
    };

    this.gridConfig.columns.push({
      'name': 'ID',
      'key': 'shopId',
      'columnType': 'data',
      'headerClass': 'text-left',
      'dataStyle': {'text-align': 'left'},
      'width': 100
    });
    this.gridConfig.columns.push({
      'name': 'Name',
      'key': 'shopName',
      'sort': true,
      'filter': true,
      'filterConfig': {
        'operators': {
          'like': true
        },
        'defaultOperator': 'like'
      },
    });
    this.gridConfig.columns.push({
      'name': 'Email',
      'key': 'email'
    });
    this.gridConfig.columns.push({
      'name': 'City',
      'key': 'city'
    });
    this.gridConfig.columns.push({
      'name': 'Telephone',
      'key': 'telephone'
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
        'action': 'view',
        'name': 'View',
        'class': 'btn-primary',
        'icon': 'fas fa-eye'
      },
      'width': 35
    });
    this.gridConfig.columns.push({
      'columnType': 'button',
      'buttonConfig': {
        'action': 'menu',
        'name': 'Menu',
        'class': 'btn-primary',
        'icon': 'far fa-hand-point-right',
        'type': 'menu',
        'menus': [
          { 'action': 'edit_ent', 'name': 'Assign Entitlements', 'icon': 'fas fa-directions', 'style' : {color: 'black'} }
        ]
      },
      'width': 35
    });
  }

  private updateStatus (record, StatusId) {
    const req = {
      'primaryId': record.categoryId,
      'status': StatusId
    };
  }

  private getDomains() {
    this.masterSev.getShopCategories().then((response: any) => {
      this.domainList = response;
      // console.log(this.domainList);
    }).catch(error => {});
  }

}
