import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualInputComponent } from './manual-input.component';

describe('ManualInputComponent', () => {
  let component: ManualInputComponent;
  let fixture: ComponentFixture<ManualInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
