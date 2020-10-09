import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AdminService, ShopService} from '../../../services';
import {GlobalService, ToastService} from '../../../core/services';
import {AdminViewComponent} from '../../admin/admin-view/admin-view.component';
import {ShopViewComponent} from '../shop-view/shop-view.component';
import {StaticConfig} from '../../../core/config';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  bsModalRef: BsModalRef;
  staticConfig = StaticConfig;

  actionRestrictionConfig = {
    VIEW: {
      isEnable: false,
      functions: ['VIEW_SHOP_DETAILS']
    },
    ADD: {
      isEnable: false,
      functions: ['CREATE_SHOP']
    },
    EDIT: {
      isEnable: false,
      functions: ['UPDATE_SHOP']
    },
    UPDATE_STATUS: {
      isEnable: false,
      functions: ['UPDATE_SHOP_STATUS']
    }
  };

  pagination = {
    pageSize: 1,
    itemsPerPage: 10,
    maxPageNumberCount: 5,
    recordCount: 0
  };

  sevReq: any;

  gridRecordList: any[] = [];
  selectedRecordList: any[] = [];

  constructor(private shopSev: ShopService, public modalService: BsModalService,
              private gSev: GlobalService, private toast: ToastService) {
    this.actionRestrictionConfig = this.gSev.getActionRestrictionConfigByConfigObj(this.actionRestrictionConfig);
  }

  initSevReq() {
    this.sevReq = {
      'offset': 0,
      'limit': this.pagination.itemsPerPage,
      'searchKeys': [],
      'values': [],
      'operators': []
    };
  }

  ngOnInit() {
    this.initSevReq();
    this.getGridRecordList();
  }

  onGridAction(action, data) {
    switch (action) {
      case 'add':
        this.openShopForm(action, data);
        break;
      case 'edit':
        this.openShopForm(action, data);
        break;
      case 'view':
        this.openShopForm(action, data);
        break;
      case 'status-update':
        this.updateShopStatus(data);
        break;
      default:
        break;
    }
  }

  updateShopStatus(status) {
    this.gridRecordList.forEach((item: any) => {
      if (item.isChecked) {
        const req = {
          primaryId: item.id,
          status: status
        };
        this.shopSev.updateShopStatus(req).then((res: any) => {
          if (res && res.status === 1) {
            item.status = status;
            item.isChecked = false;
            this.toast.showSuccess( item.name + '" Status Successfully Updated');
          } else {
            this.toast.showError( item.name + '" Status Updating failed.');
          }
        }).catch(() => {
          this.toast.showError(item.name + '" Status Updating failed.');
        });
      }
    });

  }

  openShopForm(action, data) {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };

    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(ShopViewComponent, modelConfig);
    this.bsModalRef.content.action = action;
    this.bsModalRef.content.data = data;
    this.bsModalRef.content.onClose.subscribe((response: any) => {
      if (action === 'add' && response.id) {
        this.onAddNewItem(response);
      } else if (action === 'edit' && response.id) {
        this.onEditItem(response);
      }
    });
  }

  onAddNewItem(item) {
    this.gridRecordList.push(item);
  }

  onEditItem(EditedItem) {
    this.gridRecordList = this.gridRecordList.map((existingRecord) => {
      if (existingRecord.id === EditedItem.id) {
        return EditedItem;
      } else {
        return existingRecord;
      }
    });
  }

  onPageChange(event) {
    this.sevReq.offset = (event.page - 1) * this.pagination.itemsPerPage;
    this.getGridRecordList();
  }

  onClickRefresh() {
    this.getGridRecordList();
  }

  getGridRecordList() {
    this.gridRecordList = [];
    this.shopSev.shopFindByCriteria(this.sevReq).then((res: any) => {
      this.gridRecordList = res.data;
      if (this.pagination.recordCount === 0) {
        this.pagination.recordCount = res.recordCount;
      }
    });

  }

}

