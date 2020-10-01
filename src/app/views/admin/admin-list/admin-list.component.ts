import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  // currentPageNo = 0;
  pageSize = 1;
  sevReq = {
    'offset': 0,
    'limit': this.pageSize,
    'searchKeys': [],
    'values': [],
    'operators': []
  };
  adminList: any[] = [];
  recordCount = 0;

  constructor(private adminSev: AdminService) {
  }

  ngOnInit() {
    this.getAdminList();
  }

  onClickEdit(item) {
    console.log(item);
  }

  onClickView(item) {
    console.log(item);
  }

  onPageChange(event) {
    this.sevReq.offset = (event.page - 1) * this.pageSize;
    this.getAdminList();
  }

  getAdminList() {
    this.adminSev.adminFindByCriteria(this.sevReq).then((res: any) => {
      this.adminList = res.data;
      if (this.recordCount === 0) {
        this.recordCount = res.recordCount;
      }
    });

  }

}
