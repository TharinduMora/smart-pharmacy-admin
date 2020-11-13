import {Component, OnInit} from '@angular/core';
import {MyAccountService} from '../../../services/my-account.service';
import {GlobalVariable} from '../../../core/com-classes';

@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrls: ['./my-shop.component.css']
})
export class MyShopComponent implements OnInit {

  action = 'view';
  shopAdmin: any;
  shop: any;

  constructor(private myAccountService: MyAccountService, public globalVariable: GlobalVariable) {
  }

  ngOnInit() {

    this.myAccountService.getShopById(this.globalVariable.authentication.shopId).then((res: any) => {
      this.shopAdmin = res;
      console.log(res);
    });
  }

  onSubmit() {
    console.log('asas');
  }

}
