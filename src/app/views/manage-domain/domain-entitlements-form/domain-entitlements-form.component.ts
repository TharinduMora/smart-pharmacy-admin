import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subject} from 'rxjs';

import {ToastService} from '../../../core';
import {MasterDataService, MasterDataManagementService} from '../../../services';

@Component({
  selector: 'app-domain-entitlements-form',
  templateUrl: './domain-entitlements-form.component.html',
  styleUrls: ['./domain-entitlements-form.component.scss']
})
export class DomainEntitlementsFormComponent implements OnInit {
  public action: string;
  public data: any = {};
  public onClose: Subject<boolean>;

  public unassignedFunctions: any = [];
  public assignedFunctions: any = [];
  public searchAvailableText: string;
  public searchAssignedText: string;

  constructor(public bsModalRef: BsModalRef, private masterSev: MasterDataService, private masterMgtSev: MasterDataManagementService, private toast: ToastService) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    setTimeout(() => {
      // console.log(this.data);
      // console.log(this.action);
      this.getDomainAssignedEntitle (this.data.categoryId);
      this.getDomainUnAssignedEntitle (this.data.categoryId);
    }, 0);
  }

  onCloseModal() {
    const response: any = this.action;
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

  onClickSave () {
    let req = {
      "domainId": this.data.categoryId,
      "entitlementIds": []
    };

    this.assignedFunctions.forEach((obj: any) => {
      req.entitlementIds.push(obj.entitlementId);
    });

    this.masterMgtSev.assignDomainEntitlement(req)
      .then((data: any) => {
        // console.log(data);
        this.toast.showSuccess('Successfully save.');
      }).catch((error: any) => {
      // console.log(error);
    });
  }

  onClickAssignAll () {
    this.unassignedFunctions.forEach((obj: any) => {
      obj.check = false;
      this.assignedFunctions.push(obj);
    });
    this.assignedFunctions = this.orderArrayByKey(this.assignedFunctions, 'entitlementId');
    this.unassignedFunctions = [];
  }

  onClickAssignSelected () {
    for (let num = 0; num < this.unassignedFunctions.length; num++) {
      if (this.unassignedFunctions[num].check) {
        this.unassignedFunctions[num].check = false;
        this.assignedFunctions.push(this.unassignedFunctions[num]);
        this.unassignedFunctions.splice(num, 1);
        num--;
      }
    }
    this.assignedFunctions = this.orderArrayByKey(this.assignedFunctions, 'entitlementId');
    this.searchAvailableText = null;
  }

  onClickUnAssignAll () {
    this.assignedFunctions.forEach((obj: any) => {
      obj.check = false;
      this.unassignedFunctions.push(obj);
    });
    this.unassignedFunctions = this.orderArrayByKey(this.unassignedFunctions, 'entitlementId');
    this.assignedFunctions = [];
  }

  onClickUnAssignSelected () {
    for (let num = 0; num < this.assignedFunctions.length; num++) {
      if (this.assignedFunctions[num].check) {
        this.assignedFunctions[num].check = false;
        this.unassignedFunctions.push(this.assignedFunctions[num]);
        this.assignedFunctions.splice(num, 1);
        num--;
      }
    }
    this.unassignedFunctions = this.orderArrayByKey(this.unassignedFunctions, 'entitlementId');
    this.searchAssignedText = null;
  }

  private getDomainAssignedEntitle (domainId: number) {
    this.assignedFunctions = [];
    this.masterSev.getAssignedEntitlementsByDomain(domainId).then((response: any) => {
      this.assignedFunctions = this.orderArrayByKey(response || [], 'entitlementId');
    }).catch((error: any) => {});
  }

  private getDomainUnAssignedEntitle (domainId: number) {
    this.unassignedFunctions = [];
    this.masterSev.getUnAssignEntitlementsByDomain(domainId).then((response: any) => {
      this.unassignedFunctions = this.orderArrayByKey(response || [], 'entitlementId');
    }).catch((error: any) => {});
  }

  orderArrayByKey(array: Array<any>, orderByKey: string, orderByValue: string = '+'){
    if (!orderByKey || orderByKey.trim() == ""){
      return array;
    }
    if (orderByValue === '+'){
      return Array.from(array).sort((item1: any, item2: any) => {
        return this.orderByComparator(item1[orderByKey], item2[orderByKey]);
      });
    } else{
      return Array.from(array).sort((item1: any, item2: any) => {
        return this.orderByComparator(item2[orderByKey], item1[orderByKey]);
      });
    }
  }

  private orderByComparator(a: any, b: any): number {
    if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
      //Isn't a number so lowercase the string to properly compare
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else{
      //Parse strings as numbers to compare properly
      if(parseFloat(a) < parseFloat(b)) return -1;
      if(parseFloat(a) > parseFloat(b)) return 1;
    }
    return 0; //equal each other
  }

}
