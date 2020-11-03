import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {StaticConfig} from '../../../core/config';
import {ShopService} from '../../../services';
import {GlobalService, ToastService} from '../../../core/services';
import {ShopViewComponent} from '../../shop/shop-view/shop-view.component';
import {ProductService} from '../../../services/product.service';
import {GlobalVariable} from '../../../core/com-classes';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

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

  constructor(private productSev: ProductService, public modalService: BsModalService, public gVariable: GlobalVariable,
              private gSev: GlobalService, private toast: ToastService) {
    this.actionRestrictionConfig = this.gSev.getActionRestrictionConfigByConfigObj(this.actionRestrictionConfig);
  }

  initSevReq() {
    this.sevReq = {
      'shopId':this.gVariable.authentication.shopId,
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
        // this.productSev.updateShopStatus(req).then((res: any) => {
        //   if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        //     item.status = status;
        //     item.isChecked = false;
        //     this.toast.showSuccess(item.name + '" Status Successfully Updated');
        //   } else {
        //     this.toast.showError(item.name + '" Status Updating failed.');
        //   }
        // }).catch(() => {
        //   this.toast.showError(item.name + '" Status Updating failed.');
        // });
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
    this.productSev.productFindByCriteria(this.sevReq).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.gridRecordList = res.data;
        if (this.pagination.recordCount === 0) {
          this.pagination.recordCount = res.recordCount;
        }
      }
    }).catch((e) => {
      console.log(e);
    });

  }

}


