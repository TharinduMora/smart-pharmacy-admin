import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { StaticConfig } from '../../../core';
import { MasterDataService, MasterDataManagementService } from "../../../services";
import { NewBrandFormComponent } from '../new-brand-form/new-brand-form.component';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  bsModalRef: BsModalRef;

  public gridOnChangeTime = new Date().getTime();
  public gridEvent: any = {};
  public gridConfig: any = {};
  private recordList = [];

  public domainSelected: any = null;
  public shopTypeSelected: any = null;
  public shopTypeList: any = [];

  public staticConfig = StaticConfig;
  private shopCategories= [];
  public brand = {};

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

  private initDataGrid(){
    this.initGridConfig();
    this.gridConfig.apiSev = this.masterSev;
    this.onCallGridEven('refresh', {});
  }

  onClickAddBtn() {
    this.action = 'add';
    this.brand = {};
    this.openProductBrandModel();
  }

  onUpdateStatus(statusDetails, status) {
    for (let i = 0; i < this.recordList.length; i++) {
      if (this.recordList[i].check) {
        this.updateStatus(this.gridConfig.records[i], statusDetails.ID);
      }
    }
  }

  private openProductBrandModel() {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(NewBrandFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.brand = Object.assign({}, this.brand || {});
    this.bsModalRef.content.onClose.subscribe(response => {
      // console.log(response);
      if (this.action === 'edit') {
        if(response.brandId){
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
        this.brand = $event.record;
        this.openProductBrandModel();
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
      'sevFunction': 'getBrands',
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
      'primaryKey': 'brandId',
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
      'key': 'brandId',
      'columnType': 'data',
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
      'name': 'Name',
      'key': 'name'
    });
    this.gridConfig.columns.push({
      'name': 'Description',
      'key': 'description'
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
      'primaryId': record.brandId,
      'status': StatusId
    };
    this.masterMgtSev.updateBrandStatus(req).then((response: any) => {
      // console.log(response);
      const data = {
        'brandId': response.id,
        'status': StatusId
      };
      this.onCallGridEven('edit', data);
    }).catch((error: any) => {});
  }

  private getDomains() {
    this.masterSev.getShopCategories().then((response: any) => {
      response.forEach((obj: any) => {
        const shopCategory = {
          'key': obj.categoryId,
          'value': obj.name
        };
        this.shopCategories.push(shopCategory);
        this.initDataGrid();
      });
      // console.log(this.domainList);
    }).catch(error => {
      this.initDataGrid();
    });
  }

}


