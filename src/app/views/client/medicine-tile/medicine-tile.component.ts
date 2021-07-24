import { GlobalVariable } from "./../../../core/com-classes/global-variable";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-medicine-tile",
  templateUrl: "./medicine-tile.component.html",
  styleUrls: ["./medicine-tile.component.css"],
})
export class MedicineTileComponent implements OnInit {
  @Input() medicine: any;
  constructor(public globalVariable: GlobalVariable) {}

  ngOnInit() {}
}
