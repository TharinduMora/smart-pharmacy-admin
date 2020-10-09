import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap';
import {MasterDataService, ShopService} from '../../../services';
import {NgForm} from '@angular/forms';
import {GlobalVariable} from '../../../core/com-classes';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit, AfterViewInit {

  public onClose: Subject<boolean>;
  public action: string;
  public data: any = {};
  public shop: any = {};
  public shopAdmin: any = {};
  public imageConfig: any = {};

  constructor(
    public bsModalRef: BsModalRef,
    private masterDataService: MasterDataService,
    private shopService: ShopService,
    private globalVariable: GlobalVariable
  ) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    this.initImageConfig();
  }

  initImageConfig() {
    this.imageConfig.image = null;
    this.imageConfig.imgUrl = this.globalVariable.appConfig.IMAGE_URL;
    // console.log(this.imageConfig);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.action === 'edit' || this.action === 'view') {
        this.shop = this.data;
        this.imageConfig.image = this.globalVariable.appConfig.IMAGE_URL + this.shop.image;
      }
    }, 2000);
  }

  createShop(req: any) {
    this.shopService.createNewShop(req).then((res: any) => {
      if (res && res.status === 1) {
        this.onCloseModal(res.data);
      }
    });
  }

  asd(event) {
    this.shop.image = event.data;
    console.log(this.shop.image);
  }

  updateShop(req: any) {
    this.shopService.updateShop(req).then((res: any) => {
      if (res && res.status === 1) {
        this.onCloseModal(this.shop);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.action === 'add') {
        this.shop.admin = this.shopAdmin;
        this.createShop(this.shop);
      } else if (this.action === 'edit') {
        this.updateShop(this.shop);
      }
    }
  }

  onCloseModal(response: any = {}) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

}
