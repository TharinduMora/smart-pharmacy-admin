import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {NgForm, FormBuilder } from '@angular/forms';

import {ToastService, GlobalVariable} from '../../../core';
import {MasterDataService, MasterDataManagementService} from '../../../services';


@Component({
  selector: 'app-new-brand-form',
  templateUrl: './new-brand-form.component.html',
  styleUrls: ['./new-brand-form.component.scss']
})
export class NewBrandFormComponent implements OnInit {
  public brand: any = {};
  public waitHttpResponse = false;
  public shopChategories = [];
  public onClose: Subject<boolean>;
  public fileUploadConfig: any = {};
  action: string;
  public imageURL: any = null;
  public openImage = false;
  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private masterSev: MasterDataService,
              private masMgtSev: MasterDataManagementService,
              private toastNot: ToastService,
              private gVariable: GlobalVariable,
              private fb: FormBuilder) {
    this.onClose = new Subject();
    this.getShopChatagories();
  }

  ngOnInit() {
    setTimeout(() => {

      if (this.action === 'edit') {
        this. initBrandDetails();
      }else {
        this.fileUploadConfig = {
          'width' : 200,
          'height' : 150,
          'shopId' : this.gVariable.shopId,
          'type' : 'shop',
          'imgUrl' : this.gVariable.appConfig.IMAGE_URL,
          'image': this.imageURL
        };
        this.brand = {};
        this.openImage = true;
      }
    }, 0);
  }
  initBrandDetails() {
    if (this.brand.image !== '') {
      this.imageURL =  this.gVariable.appConfig.IMAGE_URL + this.brand.image;
    }
    this.fileUploadConfig = {
      'width' : 200,
      'height' : 150,
      'shopId' : this.gVariable.shopId,
      'type' : 'shop',
      'imgUrl' : this.gVariable.appConfig.IMAGE_URL,
      'image': this.imageURL
    };
    this.openImage = true;
  }

  onCloseModal() {
    const response: any = this.brand;
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
  private getShopChatagories() {
    this.masterSev.getShopCategories().then((response: any) => {
      this.shopChategories = response;
      // console.log('Shop chatogories successfully taken');
    }).catch((error: any) => {});
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.action === 'add') {
        this.createBrand(this.brand);
      } else if (this.action === 'edit') {
        this.updateBrand(this.brand);
      }
    }
  }
  onClickReset(form: NgForm) {
    form.onReset();
  }

  private createBrand(brand: any) {
    this.masMgtSev.addBrand(brand).then((response: any) => {
      this.toastNot.showSuccess('Brand Added Successfully.');
    }).catch(error => {});
  }
  private updateBrand(brand: any) {
    this.masMgtSev.updateBrand(brand).then((response: any) => {
      this.toastNot.showSuccess('Brand updated Successfully.');
    }).catch((error: any) => {});
  }
  onFileUploadEvent($event) {
    switch ($event.type) {
      case 'uploaded': {
        this.brand.image = $event.data.fileName;
        break;
      }
      case 'deleted': {
        this.brand.image = null;
        break;
      }
      case 'error': {
        this.brand.image = null;
        break;
      }
      default: {
        this.brand.image = null;
        break;
      }
    }
  }

}
