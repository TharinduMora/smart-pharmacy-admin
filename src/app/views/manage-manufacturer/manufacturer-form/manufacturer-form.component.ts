import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subject} from 'rxjs';
import {NgForm } from '@angular/forms';

import {GlobalVariable, ToastService} from '../../../core';
import {ManufacturerService} from "../../../services";
import {Md5} from "ts-md5";

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.css']
})
export class ManufacturerFormComponent implements OnInit {

  private manufacturerCopy : any = {};
  public manufacturerData : any = {};
  public onClose: Subject<boolean>;
  public action: string;

  public fileUploadConfig: any = {};
  public imageURL: any = null;
  public openImage = false;

  constructor(public bsModalRef: BsModalRef,
              private gVariable: GlobalVariable,
              private toastNot: ToastService,
              private manufacturerSev: ManufacturerService) {
    this.onClose = new Subject();
  }

  ngOnInit() {

    this.fileUploadConfig = {
      'shopId' : this.gVariable.shopId,
      'type' : 'superAdmin',
      'imgUrl' : this.gVariable.appConfig.IMAGE_URL,
      'image': this.imageURL
    };

    this.openImage = false;
    setTimeout(() => {
      this.manufacturerCopy = Object.assign({}, this.manufacturerData);

      if (this.manufacturerData.image) {
        this.fileUploadConfig.image = this.gVariable.appConfig.IMAGE_URL + this.manufacturerData.image;
      } else {
        this.fileUploadConfig.image = null;
      }
      this.openImage = true;

      // console.log(this.manufacturerData);

    }, 0);
  }

  onCloseModal(response: any) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let req: any = {
        "code": this.manufacturerData.code,
        "name": this.manufacturerData.name,
        "image": this.manufacturerData.image || null,
        "address": this.manufacturerData.address || null,
        "telephone": this.manufacturerData.telephone || null
      };
      // console.log(req);

      if (this.action === 'add') {
        this.manufacturerSev.createManufacturer(req).then((response: any) => {
          this.toastNot.showSuccess('Save Successfully.');
          this.onCloseModal(response.data);
        }).catch(error => {});
      }else{
        delete req.code;
        req.manufacturerId = this.manufacturerData.manufacturerId;
        this.manufacturerSev.updateManufacturer(req).then((response: any) => {
          this.toastNot.showSuccess('Save Successfully.');
          this.onCloseModal(req);
        }).catch(error => {});
      }

    }
  }

  onClickReset(form: NgForm) {
    if (this.action === 'add') {
      form.onReset();

      // reset image
      this.fileUploadConfig.image = null;
      this.openImage = false;
      setTimeout(() => {
        this.openImage = true;
      }, 0);
    }else{
      this.manufacturerData = Object.assign({}, this.manufacturerCopy);

      // reset image
      if (this.manufacturerData.image) {
        this.fileUploadConfig.image = this.gVariable.appConfig.IMAGE_URL + this.manufacturerData.image || null;
      } else {
        this.fileUploadConfig.image = null;
      }
      this.openImage = false;
      setTimeout(() => {
        this.openImage = true;
      }, 0);
    }
  }

  onFileUploadEvent($event) {
    switch ($event.type) {
      case 'uploaded': {
        this.manufacturerData.image = $event.data.fileName;
        break;
      }
      case 'deleted': {
        this.manufacturerData.image = null;
        break;
      }
      case 'error': {
        this.manufacturerData.image = null;
        break;
      }
      default: {
        this.manufacturerData.image = null;
        break;
      }
    }
  }

}
