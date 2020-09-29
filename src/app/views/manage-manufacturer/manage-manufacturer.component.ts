import { Component, OnInit } from '@angular/core';

import {GlobalService} from './../../core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-manage-manufacturer',
  templateUrl: './manage-manufacturer.component.html',
  styleUrls: ['./manage-manufacturer.component.css']
})
export class ManageManufacturerComponent implements OnInit {

  private mainPath = '/admin/manage-manufacturer';
  private subPath = '';

  private tabList: any[] = [
    {
      title: 'Manufacturer List',
      entitlements: [],
      active: false,
      route: '/admin/manage-manufacturer/list'
    }
  ];

  public tabs: any[] = [];

  constructor(private router: Router, private gSev: GlobalService) { }

  ngOnInit() {
    this.tabList.forEach((obj: any) => {
      if (true) {
        this.tabs.push(obj);
      }
    });
    if (this.tabs.length > 0) {
      this.subPath = this.tabs[0].route;
    }
    this.initRoute();
  }

  onSelectTab(tab: any) {
    tab.active = true;
    this.router.navigate([tab.route]);
  }

  private initRoute() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // console.log('NavigationEnd:', event.url);
          if (event.url === this.mainPath) {
            this.router.navigate([this.subPath]);
          }
          this.activeTab();
        }
      });
    if (this.router.url === this.mainPath) {
      this.router.navigate([this.subPath]);
    } else {
      this.activeTab();
    }
  }

  private activeTab() {
    for (const key in this.tabs) {
      if (this.router.url === this.tabs[key].route) {
        this.tabs[key].active = true;
        return true;
      }
    }
  }

}
