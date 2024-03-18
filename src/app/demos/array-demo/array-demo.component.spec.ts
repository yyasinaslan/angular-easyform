import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayDemoComponent } from './array-demo.component';

describe('ArrayDemoComponent', () => {
  let component: ArrayDemoComponent;
  let fixture: ComponentFixture<ArrayDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrayDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
