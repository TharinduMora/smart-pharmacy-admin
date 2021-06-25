import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GlobalVariable } from "src/app/core";

@Component({
  selector: "app-pharmacy-tile",
  templateUrl: "./pharmacy-tile.component.html",
  styleUrls: ["./pharmacy-tile.component.css"],
})
export class PharmacyTileComponent implements OnInit {
  @Input() pharmacyDetails: any;
  @Output() onVisitPharmacy = new EventEmitter();

  constructor(public globalVariable: GlobalVariable) {}

  ngOnInit() {}

  onClickVisit() {
    this.onVisitPharmacy.emit({ id: this.pharmacyDetails.id });
  }
}
