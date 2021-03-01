import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { MasterDataService, ShopService } from '../../../services';
import { NgForm } from '@angular/forms';
import { GlobalVariable } from '../../../core/com-classes';
import { ToastService } from '../../../core/services';
import { StaticConfig } from '../../../core/config';

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
  public imageConfig: any = {
    image: null,
    imgUrl: this.globalVariable.appConfig.IMAGE_URL,
    width: 100,
    height: 100,
  };

  shopLocation = {
    lat: 0,
    lng: 0
  };

  dataLoaded = false;

  constructor(
    public bsModalRef: BsModalRef,
    private masterDataService: MasterDataService,
    private shopService: ShopService,
    public globalVariable: GlobalVariable,
    private toastService: ToastService
  ) {
    this.onClose = new Subject();
  }

  ngOnInit() {
  }

  setImageToConfig(imageUrl) {
    this.imageConfig.image = this.globalVariable.appConfig.IMAGE_URL + imageUrl;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.action === 'edit' || this.action === 'view') {
        this.shop = this.data;
        this.shopLocation.lat = this.shop.latitude;
        this.shopLocation.lng = this.shop.longitude;
        this.setImageToConfig(this.shop.image);
        this.dataLoaded = true;
      }
    }, 100);
  }

  createShop(req: any) {
    this.shopService.createNewShop(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.onCloseModal(res.data);
      }
    });
  }

  onFileUploadEvent(event) {
    this.shop.image = event.data;
  }

  updateShop(req: any) {
    this.shopService.updateShop(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.onCloseModal(this.shop);
        this.toastService.showSuccess('Successfully Updated!');
      } else {
        this.toastService.showSuccess('Failed to update!');
      }
    }).catch(() => {
      this.toastService.showSuccess('Failed to update!');
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

  onSelectLocation(val) {
    this.shop.latitude = val.lat;
    this.shop.longitude = val.lng;
  }
}
