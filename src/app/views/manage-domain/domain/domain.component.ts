import {Component, OnInit} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {StaticConfig} from '../../../core';
import {MasterDataService} from '../../../services';
import {DomainEntitlementsFormComponent} from '../domain-entitlements-form/domain-entitlements-form.component';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  bsModalRef: BsModalRef;

  public gridOnChangeTime = new Date().getTime();
  public gridEvent: any = {};
  public gridConfig: any = {};

  constructor(private masterSev: MasterDataService, private modalService: BsModalService) { }

  ngOnInit() {
    this.initGridConfig();
  }

  onGridActionEvent($event) {
    // console.log($event);
    switch ($event.action) {
      case 'edit': {
        this.openDomainEntitlementsModel($event.record);
        break;
      }
      default: {
        break;
      }
    }
  }

  private openDomainEntitlementsModel (data: any) {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(DomainEntitlementsFormComponent, modelConfig);
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
      'apiSev': this.masterSev,
      'sevFunction': 'shopCategoryFindByCriteria',
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
      'name': 'Domain ID',
      'key': 'categoryId',
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
        'action': 'menu',
        'name': 'Menu',
        'class': 'btn-primary',
        'icon': 'far fa-hand-point-right',
        'type': 'menu',
        'menus': [
          { 'action': 'edit', 'name': 'Assign Entitlements', 'icon': 'fas fa-directions', 'style' : {color: 'black'} }
        ]
      },
      'width': 35
    });
  }

}
