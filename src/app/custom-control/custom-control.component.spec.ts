import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomControlComponent } from './custom-control.component';

describe('CustomControlComponent', () => {
  let component: CustomControlComponent;
  let fixture: ComponentFixture<CustomControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
