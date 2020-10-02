import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AdminViewComponent} from '../admin-view/admin-view.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  bsModalRef: BsModalRef;

  pagination = {
    pageSize: 1,
    itemsPerPage: 2,
    maxPageNumberCount: 2,
    recordCount: 0
  };

  sevReq: any;

  gridRecordList: any[] = [];

  constructor(private adminSev: AdminService, public modalService: BsModalService) {
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
        this.openAdminForm(action, data);
        break;
      case 'edit':
        this.openAdminForm(action, data);
        break;
      default:
        break;
    }
  }

  openAdminForm(action, data) {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };

    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(AdminViewComponent, modelConfig);
    this.bsModalRef.content.action = action;
    this.bsModalRef.content.data = data;
    this.bsModalRef.content.onClose.subscribe(response => {
      console.log(response);
      // if (this.action === 'add' && response.adminId) {
      //   this.onCallGridEvent('add', response || {});
      // } else if (this.action === 'edit' && response.adminId) {
      //   this.onCallGridEvent('edit', response || {});
      // }
    });
  }

  onClickEdit(item) {
    console.log(item);
  }

  onClickView(item) {
    console.log(item);
  }

  onPageChange(event) {
    this.sevReq.offset = (event.page - 1) * this.pagination.itemsPerPage;
    this.getGridRecordList();
  }

  getGridRecordList() {
    this.gridRecordList = [];
    this.adminSev.adminFindByCriteria(this.sevReq).then((res: any) => {
      this.gridRecordList = res.data;
      if (this.pagination.recordCount === 0) {
        this.pagination.recordCount = res.recordCount;
      }
    });

  }

}
