import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightBlockComponent } from './highlight-block.component';

describe('HighlightBlockComponent', () => {
  let component: HighlightBlockComponent;
  let fixture: ComponentFixture<HighlightBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
