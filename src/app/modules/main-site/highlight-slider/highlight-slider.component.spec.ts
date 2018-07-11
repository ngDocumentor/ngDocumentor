import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightSliderComponent } from './highlight-slider.component';

describe('HighlightSliderComponent', () => {
  let component: HighlightSliderComponent;
  let fixture: ComponentFixture<HighlightSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
