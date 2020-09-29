import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopConfigFormComponent } from './shop-config-form.component';

describe('ShopConfigFormComponent', () => {
  let component: ShopConfigFormComponent;
  let fixture: ComponentFixture<ShopConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
