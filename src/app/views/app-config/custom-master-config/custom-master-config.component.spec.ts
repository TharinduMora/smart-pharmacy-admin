import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMasterConfigComponent } from './custom-master-config.component';

describe('CustomMasterConfigComponent', () => {
  let component: CustomMasterConfigComponent;
  let fixture: ComponentFixture<CustomMasterConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMasterConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMasterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
