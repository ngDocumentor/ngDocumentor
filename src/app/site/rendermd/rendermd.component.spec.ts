import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendermdComponent } from './rendermd.component';

describe('RendermdComponent', () => {
  let component: RendermdComponent;
  let fixture: ComponentFixture<RendermdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendermdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendermdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
