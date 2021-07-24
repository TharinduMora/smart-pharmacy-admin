import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTileComponent } from './medicine-tile.component';

describe('MedicineTileComponent', () => {
  let component: MedicineTileComponent;
  let fixture: ComponentFixture<MedicineTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
