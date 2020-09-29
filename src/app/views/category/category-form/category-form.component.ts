import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subject} from 'rxjs';
import {NgForm, FormBuilder } from '@angular/forms';

import {ToastService, StaticConfig, GlobalVariable} from '../../../core';
import {MasterDataService, MasterDataManagementService} from '../../../services';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {

  public onClose: Subject<boolean>;

  public action: string;
  public data: any = {};
  private categoryFormType: any = null;
  public shopType: any = {};
  public shopDomain: any = {};
  public categoryTypeList: any = [];
  public parentCategoryTypeList: any = [];
  public categoryLevelList = StaticConfig.CATEGORY_LEVEL;
  public dataTypesList = StaticConfig.SHOP_DATA_TYPES;
  public disableDataType: boolean = false;
  public parentCategoryList = [];
  public fileUploadConfig: any = {};
  public imageURL: any = null;
  public openImage = false;

  public category: any = {};

  constructor(public bsModalRef: BsModalRef,
              private masterSev: MasterDataService,
              private masMngSev: MasterDataManagementService,
              private toastNot: ToastService,
              private gVariable: GlobalVariable,
              protected changeDetectorRef: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.onClose = new Subject();
  }

  ngOnInit() {

    setTimeout(() => {
      // console.log(this.shopType);
      // console.log(this.shopDomain);
      // console.log(this.categoryTypeList);
      // console.log(this.data);

      this.parentCategoryTypeList = this.categoryTypeList;
      console.log(this.categoryFormType);

      if (this.action === 'edit') {
        this.getCategoryDetailsById(this.data.categoryId).then((response: any) => {
          // console.log(response);
          this.data = response;
          this.initCategoryForm();
        }).catch(error => {});
      } else {
        this.initCategoryForm();
      }
    }, 0);
  }

  private initCategoryForm() {

    this.category = {};
    this.imageURL = null;

    if (this.action === 'edit') {
      this.category = this.data;
      if (!this.category.additionalData) {
        this.category.additionalData = {};
      }
      this.category.description = this.category.additionalData.description || null;
      if (this.category.image !== null && this.category.image !== '') {
        this.imageURL = this.gVariable.appConfig.IMAGE_URL + this.category.image;
      }

      this.parentCategoryList = [];
      if (this.data.parentCategory) {
        this.category.parentCategoryType = this.data.parentCategory.type
        this.parentCategoryList.push(this.data.parentCategory || {});
      } else {
        this.parentCategoryList.push({
          categoryId : 0,
          value : '- No Parent Category -'
        });
      }

      this.category.parentCategoryId = this.parentCategoryList[0].categoryId;

    } else {
      if (this.categoryTypeList[0]) {
        this.category.type = this.categoryTypeList[0].key;
        this.onChangeCategoryType(this.category.type);
      }
      if (this.parentCategoryTypeList[0]) {
        this.category.parentCategoryType = this.parentCategoryTypeList[0].key;
        this.parentCategoryList = [];
        this.getParentCategory(this.category.parentCategoryType);
      }
    }

    // console.log(this.category);

    // this.getParentCategory();

    this.fileUploadConfig = {
      'width' : 200,
      'height' : 150,
      'shopId' : this.gVariable.shopId,
      'type' : 'shop',
      'imgUrl' : this.gVariable.appConfig.IMAGE_URL,
      'image': this.imageURL
    };
    this.openImage = false;
    setTimeout(() => {
      this.openImage = true;
    }, 0);

  }

  onChangeParentCategoryType(categoryType: any){
    // console.log(categoryType);
    this.parentCategoryList = [];
    this.getParentCategory(categoryType);
  }

  onChangeCategoryType(categoryType: any){
    // console.log(categoryType);
    this.disableDataType = false;
    for (let key in this.categoryTypeList) {
       if (this.categoryTypeList[key].key === categoryType) {
         if (this.categoryTypeList[key].dataType) {
           this.category.dataType = this.categoryTypeList[key].dataType;
           this.disableDataType = true;
         }
         break;
       }
     }
  }

  onFileUploadEvent($event) {
    switch ($event.type) {
      case 'uploaded': {
        this.category.image = $event.data.fileName;
        break;
      }
      case 'deleted': {
        this.category.image = null;
        break;
      }
      case 'error': {
        this.category.image = null;
        break;
      }
      default: {
        this.category.image = null;
        break;
      }
    }
  }

  onCloseModal(response: any) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    if (form.valid) {
      if (this.action === 'add') {
        this.createCategory(form,this.category);
      } else if (this.action === 'edit') {
        this.updateCategory(this.category);
      }
    }
  }

  onClickReset(form: NgForm) {
    form.onReset();
  }

  private createCategory(form: NgForm, category: any) {
    let req = {
      "type": category.type,
      "dataType": category.dataType,
      "shopTypeId": 0,//this.shopType.id
      "shopCategoryId": this.shopDomain.categoryId,
      "parent": category.parent || false,
      "value": category.value,
      "parentCategoryId": category.parentCategoryId || 0,
      "image": category.image,
      "additionalData": {
        "description" : category.description
      }
    };
    // console.log(req);
    if(this.categoryFormType === 'PRODUCT'){
      this.masMngSev.addProductCategory(req).then((response: any) => {
        // console.log(response);
        this.toastNot.showSuccess('Category added successfully.');
        // this.onCloseModal();
        form.resetForm();
        this.changeDetectorRef.detectChanges();
        this.initCategoryForm();
        // form.submitted = false;
      }).catch(error => {});
    }else if(this.categoryFormType === 'SERVICE'){
      this.masMngSev.addServiceCategory(req).then((response: any) => {
        // console.log(response);
        this.toastNot.showSuccess('Category added successfully.');
        // this.onCloseModal();
        form.resetForm();
        this.changeDetectorRef.detectChanges();
        this.initCategoryForm();
        // form.submitted = false;
      }).catch(error => {});
    }
  }

  private updateCategory(category: any) {
    let req = {
      "categoryId": category.categoryId,
      "dataType": category.dataType,
      "value": category.value,
      "image": category.image,
      "additionalData": {
        "description" : category.description
      }
    };
    if(this.categoryFormType === 'PRODUCT'){
      this.masMngSev.updateProductCategory(req).then((response: any) => {
        this.toastNot.showSuccess('Category updated successfully.');
        this.onCloseModal(category);
      }).catch(error => {});
    }else if(this.categoryFormType === 'SERVICE'){
      this.masMngSev.updateServiceCategory(req).then((response: any) => {
        this.toastNot.showSuccess('Category updated successfully.');
        this.onCloseModal(category);
      }).catch(error => {});
    }
  }

  private getParentCategory(categoryType: string) {
    const req: any = {
      'offset': 0,
      'limit': 999,
      'orderByKey': 'categoryId',
      'orderByValue': 'asc',
      'searchKeys': ['parent'],
      'operators': ['eq'],
      'values': [ true ],
      'statuses': [ StaticConfig.STATUS_LIST.APPROVED.ID ]
    };

    // if (this.shopType.id) {
    //   req.searchKeys.push('shopTypeId');
    //   req.operators.push('eq');
    //   req.values.push(this.shopType.id);
    // }

    if (this.shopDomain.categoryId) {
      req.searchKeys.push('shopCategoryId');
      req.operators.push('eq');
      req.values.push(this.shopDomain.categoryId);
    }

    if (categoryType) {
      req.searchKeys.push('type');
      req.operators.push('eq');
      req.values.push(categoryType);
    }

    if(this.categoryFormType === 'PRODUCT'){
      this.masterSev.categoryFindByCriteria(req).then((response: any) => {
        this.parentCategoryList = response.data;
        this.parentCategoryList.unshift({
          categoryId : 0,
          value : '- No Parent Category -'
        });
        this.category.parentCategoryId = this.parentCategoryList[0].categoryId;
      }).catch(error => {});
    }else if(this.categoryFormType === 'SERVICE'){
      this.masterSev.serviceCategoryFindByCriteria(req).then((response: any) => {
        this.parentCategoryList = response.data;
        this.parentCategoryList.unshift({
          categoryId : 0,
          value : '- No Parent Category -'
        });
        this.category.parentCategoryId = this.parentCategoryList[0].categoryId;
      }).catch(error => {});
    }
  }

  private getCategoryDetailsById(id: number) {
    if(this.categoryFormType === 'PRODUCT'){
      const promise = new Promise((resolve, reject) => {
        this.masterSev.getProductCategoryDetailsById(id).then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
          reject(error);
        });
      });
      return promise;
    }else if(this.categoryFormType === 'SERVICE'){
      const promise = new Promise((resolve, reject) => {
        this.masterSev.getServiceCategoryDetailsById(id).then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
          reject(error);
        });
      });
      return promise;
    }
  }


}
