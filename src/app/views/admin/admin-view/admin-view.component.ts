import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';
import {AdminService, MasterDataService} from '../../../services';
import {StaticConfig} from '../../../core/config';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit, AfterViewInit {

  public onClose: Subject<boolean>;
  public action: string;
  public data: any = {};
  public admin: any = {};
  public shopList: any[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private masterDataService: MasterDataService,
    private adminService: AdminService,
  ) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    this.getShopList();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.action === 'edit' || this.action === 'view') {
        this.admin = this.data;
      }
    }, 100);
  }

  getShopList() {
    this.masterDataService.getAllShopList().then((res: any) => {
      if (res && res.status === 1) {
        this.shopList = res.data;
      }
    });
  }

  createAdmin(req: any) {
    this.adminService.createNewAdmin(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.onCloseModal(res.data);
      }
    });
  }

  updateAdmin(req: any) {
    this.adminService.updateAdmin(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.onCloseModal(this.admin);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.action === 'add') {
        this.createAdmin(form.value);
      } else if (this.action === 'edit') {
        this.updateAdmin(this.admin);
      }
    }
  }

  onCloseModal(response: any = {}) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

}
