import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnChanges, OnInit {

  @Input() gridOnChangeTime = 0;
  @Input() gridEvent: any = {};
  @Input() gridConfig: any = {};

  @ViewChildren('FilterBoxList') FilterBoxList: QueryList<any>;

  @Output() onGridActionEvent: EventEmitter<any> = new EventEmitter();

  private filterBox: any;
  private sevReq: any = {};
  private filterCondition: any = [];
  private sortCondition: any = {};

  constructor(private datePipe: DatePipe,
              private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    // console.log(this.gridConfig);
    this.initGrid();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.gridOnChangeTime);
    // console.log(this.gridEvent);
    if (this.gridEvent.event) {
      this.onCallGridEvent(this.gridEvent.event, this.gridEvent.data);
    }
  }

  onClickActionBtn(key, record: any) {
    // console.log(key);
    // console.log(record);
    this.onGridActionEvent.emit({action: key, record: record});
  }

  onChangeCheckAllRows() {
    this.readAllRecords();
    this.onGridActionEvent.emit({action: 'check', record: this.gridConfig.records});
  }

  onChangeRowCheckBox() {
    this.gridConfig.checkAll = true;
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (!this.gridConfig.records[i].check) {
        this.gridConfig.checkAllRows = false;
        break;
      }
    }
    this.onGridActionEvent.emit({action: 'check', record: this.gridConfig.records});
    // console.log(this.gridConfig.records);
  }

  onClickSortBtn(column) {
    this.sortGridRecords(column);
  }

  onClickOpenFilter(column: any) {
    this.initFilterPanel();
    column.filterPanelOpen = !column.filterPanelOpen;
  }

  onClickFilterBtn($event, column) {
    this.filterCondition = this.getFilterCondition();
    // console.log(this.filterCondition);
    this.initSevReq();
    this.getRecords();
    this.toggleDropDown($event, column);
  }

  onClickFilterClearBtn($event, column) {
    if (typeof column.filterConfig === 'object') {
      column.filterConfig.value = '';
    }
    this.filterCondition = this.getFilterCondition();
    // console.log(this.filterCondition);
    this.initSevReq();
    this.getRecords();
    this.toggleDropDown($event, column);
  }

  onChangeFilterDropDown(value: boolean, column: any): void {
    column.filterPanelOpen = value;
  }

  onPageChange($event) {
    // console.log($event);
    this.sevReq.offset = ($event.page - 1) * this.gridConfig.pagination.itemsPerPage;
    this.getRecords();
  }

  onClickRefresh() {
    this.initGrid();
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    this.filterBox = this.FilterBoxList;
    for (let i = 0; i < this.filterBox._results.length; i++) {
      if (this.filterBox._results[i].nativeElement.contains(event.target)) {
        // console.log("clicked inside");
        return false;
      }
    }
    this.initFilterPanel();
  }

  private onCallGridEvent(event: string, data: any) {
    try {
      switch (event) {
        case 'add':
          const obj: any = {};
          obj.trClass = 'new-tr';
          obj.row = this.analyzeRecordDisplayFormat(data);
          this.gridConfig.records.unshift(obj);
          break;
        case 'edit':
          this.gridConfig.checkAllRows = false;
          for (let i = 0; i < this.gridConfig.records.length; i++) {
            if (this.gridConfig.records[i][this.gridConfig.primaryKey] === data[this.gridConfig.primaryKey]) {

              Object.keys(data).forEach(key => {
                this.gridConfig.records[i][key] = data[key];
              });
              this.gridConfig.records[i].check = false;
              this.gridConfig.records[i].trClass = 'edit-tr';
              this.gridConfig.records[i].row = this.analyzeRecordDisplayFormat(this.gridConfig.records[i]);
              break;
            }
          }
          break;
        case 'delete':
          for (let i = 0; i < this.gridConfig.records.length; i++) {
            if (this.gridConfig.records[i][this.gridConfig.primaryKey] === data[this.gridConfig.primaryKey]) {
              this.gridConfig.records.splice(i, 1);
              break;
            }
          }
          break;
        case 'refresh':
          this.initGrid();
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
    }
  }

  private initGrid() {
    this.gridConfig.checkAllRows = false;
    this.gridConfig.pagination.bigTotalItems = 0;
    this.gridConfig.pagination.bigCurrentPage = 1;
    this.filterCondition = [];
    this.sortCondition = {};
    this.initSevReq();
    this.readAllColumns();
    this.readAllRecords();
    this.initColumnConfig();
    this.initSortConfig();
    this.getRecords();
  }

  private initSevReq() {
    this.sevReq = {
      'offset': 0,
      'limit': this.gridConfig.pagination.itemsPerPage,
      'fromDate': this.gridConfig.apiParameters.fromDate || null,
      'toDate': this.gridConfig.apiParameters.toDate || null,
      'groupBy': [],
      'statuses': this.gridConfig.apiParameters.statuses || [],
      'searchKeys': [],
      'values': [],
      'operators': [],
      'orderByKey': null,
      'orderByValue': null
    };

    (this.gridConfig.searchParameters || []).forEach((obj: any) => {
      this.sevReq.searchKeys.push(obj.key);
      this.sevReq.values.push(obj.value);
      this.sevReq.operators.push(obj.operator);
    });
  }

  private readAllColumns(): void {
    this.gridConfig.columns.forEach((column: any) => {
      column.tdClass = '';
    });
  }

  private readAllRecords(): void {
    this.gridConfig.records.forEach((record: any) => {
      record.check = this.gridConfig.checkAllRows;
    });
    // console.log(this.gridConfig.records);
  }

  private getFilterCondition(): any {
    const filterArray = [];
    this.gridConfig.columns.forEach((column: any) => {
      column.filtered = false;
      column.tdClass = '';
      if (typeof column.filterConfig === 'object' && typeof column.filterConfig.value !== 'undefined' && column.filterConfig.value !== '') {
        const condition = {
          'key': column.key,
          'operator': column.filterConfig.defaultOperator,
          'value': column.filterConfig.value
        };
        switch (column.dataType) {
          case 'boolean' : {
            condition.value = column.filterConfig.value === 'true';
            break;
          }
          case 'float' : {
            condition.value = parseFloat(column.filterConfig.value) || 0;
            break;
          }
          case 'number' : {
            condition.value = parseInt(column.filterConfig.value, 10) || 0;
            break;
          }
          default: {
            break;
          }
        }
        filterArray.push(condition);
        column.filtered = true;
        column.tdClass = 'active-cell';
      }
    });
    return filterArray;
  }

  private initColumnConfig(): void {
    this.gridConfig.columns.forEach((column: any) => {
      column.sorted = false;
      column.filtered = false;
      column.filterPanelOpen = false;
      column.sortConfig = {'key': column.key, 'value': 'none'};
      if (typeof column.filterConfig === 'object' && column.filterConfig.type === 'option') {
        column.filterConfig.value = '';
      }
    });
  }

  private initSortConfig(): void {
    this.gridConfig.columns.forEach((column: any) => {
      column.sorted = false;
      // column.tdClass = '';
      column.sortConfig = {
        'key': column.key,
        'value': 'none'
      };
    });
  }

  private initFilterPanel(): void {
    try {
      this.gridConfig.columns.forEach((column: any) => {
        column.filterPanelOpen = false;
      });
    } catch (e) {}
  }

  private sortGridRecords(column: any) {
    const value = column.sortConfig.value;
    this.initSortConfig();
    switch (value) {
      case 'none': {
        column.sortConfig.value = 'asc';
        break;
      }
      case 'asc': {
        column.sortConfig.value = 'desc';
        break;
      }
      case 'desc': {
        column.sortConfig.value = 'asc';
        break;
      }
      default: {
        column.sortConfig.value = 'none';
        break;
      }
    }
    column.sorted = true;
    // column.tdClass = 'active-cell';
    this.sortCondition = column.sortConfig;
    this.getRecords();
    // console.log(column.sortConfig);
  }

  private toggleDropDown($event: MouseEvent, column: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    column.filterPanelOpen = !column.filterPanelOpen;
  }

  private getRecords() {

    const apiSev = this.gridConfig.apiSev || null;
    const sevFunction = this.gridConfig.sevFunction || null;

    this.filterCondition.forEach((obj: any) => {
      this.sevReq.searchKeys.push(obj.key);
      this.sevReq.values.push(obj.value);
      this.sevReq.operators.push(obj.operator);
    });

    this.sevReq.orderByKey = this.sortCondition.key;
    this.sevReq.orderByValue = this.sortCondition.value;

    if (apiSev && sevFunction) {
      try {
        this.gridConfig.records = [];
        this.gridConfig.waitingHttpSve = true;
        apiSev[sevFunction](this.sevReq || {}).then((data: any) => {
          // console.log(data);
          this.gridConfig.pagination.bigTotalItems = data.recordCount || 0;
          this.gridConfig.records = data.data || [];
          this.gridConfig.records.forEach((obj: any) => {
            obj.trClass = '';
            obj.row = this.analyzeRecordDisplayFormat(obj);
            // console.log(obj.row);
          });
          // console.log(this.gridConfig.records);
          this.gridConfig.waitingHttpSve = false;
        }).catch((error: any) => {
          this.gridConfig.waitingHttpSve = false;
          // console.log(error);
        });
      } catch (e) {
        this.gridConfig.waitingHttpSve = false;
        console.log(e);
      }
    }
  }

  private analyzeRecordDisplayFormat(record) {
    // console.log(this.gridConfig.columns);
    // console.log(record);
    const displayObject = {};
    try {
      this.gridConfig.columns.forEach((obj: any) => {
        let displayStyle = obj.dataStyle || {};
        if (obj.key) {
          const columnsKeyArray = obj.key.split('.');
          let displayValue = record;

          if (columnsKeyArray.length > 1) {
            for (const key in columnsKeyArray) {
              displayValue = displayValue[columnsKeyArray[key]];
            }
          } else {
            displayValue = record[obj.key];
          }

          if (obj.dataDisplayCondition) {
            for (const key in obj.dataDisplayCondition || []) {
              if (obj.dataDisplayCondition[key].key === displayValue) {
                displayValue = obj.dataDisplayCondition[key].value || displayValue;
                if (obj.dataDisplayCondition[key].style) {
                  displayStyle = obj.dataDisplayCondition[key].style || {};
                }
                break;
              }
            }
          }

          displayObject[obj.key] = {
            value : this.formatDataByType(displayValue, obj),
            style : displayStyle
          };
        }
      });
    } catch (e) {
      console.log(e);
    }
    return displayObject;
  }

  private formatDataByType(value, column) {
    let formattedValue = value;
    try {
      switch (column.dataType) {
        case 'dateTime' : {
          formattedValue = this.datePipe.transform(new Date(value), column.dataFormat || 'yyyy-MM-dd');
          break;
        }
        case 'decimal' : {
          formattedValue = this.decimalPipe.transform(25.5, column.dataFormat || '1.2-2');
          break;
        }
        default: {
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }

    return formattedValue;
  }

}
