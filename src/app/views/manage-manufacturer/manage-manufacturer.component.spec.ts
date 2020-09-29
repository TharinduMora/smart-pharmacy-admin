import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManufacturerComponent } from './manage-manufacturer.component';

describe('ManageManufacturerComponent', () => {
  let component: ManageManufacturerComponent;
  let fixture: ComponentFixture<ManageManufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
