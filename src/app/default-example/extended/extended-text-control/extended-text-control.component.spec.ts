import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedTextControlComponent } from './extended-text-control.component';

describe('ExtendedTextControlComponent', () => {
  let component: ExtendedTextControlComponent;
  let fixture: ComponentFixture<ExtendedTextControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtendedTextControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtendedTextControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
