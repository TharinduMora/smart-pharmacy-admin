import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap';
import {MasterDataService, ProductService} from '../../../services';
import {GlobalVariable} from '../../../core/com-classes';
import {ToastService} from '../../../core/services';
import {StaticConfig} from '../../../core/config';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, AfterViewInit {

  public onClose: Subject<boolean>;
  public action: string;
  public data: any = {};
  public product: any = {};
  public imageConfig: any = {
    image: null,
    imgUrl: this.globalVariable.appConfig.IMAGE_URL,
    width: 100,
    height: 100,
  };

  constructor(
    public bsModalRef: BsModalRef,
    private masterDataService: MasterDataService,
    private productService: ProductService,
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
        this.product = this.data;
        this.setImageToConfig(this.product.image);
      }
    }, 100);
  }

  createProduct(req: any) {
    this.productService.createNewProduct(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.onCloseModal(res.data);
      }
    });
  }

  onFileUploadEvent(event) {
    this.product.image = event.data;
  }

  updateProduct(req: any) {
    // req.shopId = this.globalVariable.authentication.shopId;
    req.shopId = 12;
    this.productService.updateProduct(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.onCloseModal(this.product);
        this.toastService.showSuccess('Successfully Updated!');
      } else {
        this.toastService.showError('Failed to update!');
      }
    }).catch(() => {
      this.toastService.showSuccess('Failed to update!');
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.action === 'add') {
        this.product.shopId = this.globalVariable.authentication.shopId;
        this.createProduct(this.product);
      } else if (this.action === 'edit') {
        this.updateProduct(this.product);
      }
    }
  }

  onCloseModal(response: any = {}) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

}

