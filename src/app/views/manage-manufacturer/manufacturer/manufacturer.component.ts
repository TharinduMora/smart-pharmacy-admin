import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {StaticConfig} from '../../../core';
import {ManufacturerService} from '../../../services';
import {ManufacturerFormComponent} from "../manufacturer-form/manufacturer-form.component";

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  bsModalRef: BsModalRef;

  public gridOnChangeTime = new Date().getTime();
  public gridEvent: any = {};
  public gridConfig: any = {};
  private recordList = [];

  public staticConfig = StaticConfig;
  private action = null;

  constructor(private manufacturerSev: ManufacturerService, private modalService: BsModalService) { }

  ngOnInit() {
    this.initGridConfig();
  }

  onUpdateStatus(statusDetails, status) {
    for (let i = 0; i < this.recordList.length; i++) {
      if (this.recordList[i].check) {
        this.updateStatus(this.gridConfig.records[i], statusDetails.ID);
      }
    }
  }

  onClickAddBtn() {
    this.action = 'add';
    this.openShopFormModel({});
  }

  onGridActionEvent($event) {
    // console.log($event);
    switch ($event.action) {
      case 'edit': {
        this.action = 'edit';
        let manufacturer = $event.record || {};
        this.openShopFormModel(manufacturer);
        break;
      }
      case 'view': {
        this.action = 'view';
        let manufacturer = $event.record || {};
        this.openShopFormModel(manufacturer);
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


  private openShopFormModel(data: any) {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(ManufacturerFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.manufacturerData = data;
    this.bsModalRef.content.onClose.subscribe(result => {
      // console.log(result);
      if(this.action === 'add') {
        this.onCallGridEven('add', result);
      } else if(this.action === 'edit') {
        this.onCallGridEven('edit', result);
      }
    });
  }

  private updateStatus (record, statusId) {
    const req = {
      'primaryId': record.manufacturerId,
      'status': statusId
    };
    this.manufacturerSev.updateManufacturerStatus(req).then((response: any) => {
      // console.log(response);
      const data = {
        'manufacturerId': response.id,
        'status': statusId
      };
      this.onCallGridEven('edit', data);
    }).catch((error: any) => {});
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
      'apiSev': this.manufacturerSev,
      'sevFunction': 'manufacturerFindByCriteria',
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
      'primaryKey': 'manufacturerId',
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
      'name': 'Code',
      'key': 'code',
      'columnType': 'data',
      'headerClass': 'text-left',
      'dataStyle': {'text-align': 'left'},
      'width': 100
    });

    this.gridConfig.columns.push({
      'name': 'Name',
      'key': 'name',
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
        'action': 'edit',
        'name': 'Edit',
        'class': 'btn-primary',
        'icon': 'fas fa-edit'
      },
      'width': 35
    });
  }

}
