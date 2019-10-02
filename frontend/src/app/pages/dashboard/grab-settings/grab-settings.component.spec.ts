import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabSettingsComponent } from './grab-settings.component';

describe('GrabSettingsComponent', () => {
  let component: GrabSettingsComponent;
  let fixture: ComponentFixture<GrabSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrabSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
