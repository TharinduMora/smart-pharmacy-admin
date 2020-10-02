import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';
import {MasterDataService} from '../../../services';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  public onClose: Subject<boolean>;
  public action: string;
  public data: any = {};
  public category: any = {};
  public shopList: any[] = [];
  public roleList: any[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private masterDataService: MasterDataService
  ) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    this.getShopList();
    this.getRoleList();
    this.category.shopId = 2;
  }

  getShopList() {
    this.masterDataService.getAllShopList().then((res : any) => {
      if (res && res.status === 1) {
        this.shopList = res.data;
      }
      // console.log(res);
    });
  }

  getRoleList() {
    this.masterDataService.getAllRoleList().then((res : any) => {
      if (res && res.status === 1) {
        this.roleList = res.data;
      }
    });
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    if (form.valid) {
      if (this.action === 'add') {
        console.log(form);
        // this.createCategory(form,this.category);
      } else if (this.action === 'edit') {
        console.log(form);
        // this.updateCategory(this.category);
      }
    }
  }

  onCloseModal(response: any = {}) {
    // const response: any = {};
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

}
