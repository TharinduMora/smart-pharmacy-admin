import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMasterDataComponent } from './custom-master-data.component';

describe('CustomMasterDataComponent', () => {
  let component: CustomMasterDataComponent;
  let fixture: ComponentFixture<CustomMasterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMasterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
