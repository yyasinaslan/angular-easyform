import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormExampleComponent } from './custom-form-example.component';

describe('CustomFormExampleComponent', () => {
  let component: CustomFormExampleComponent;
  let fixture: ComponentFixture<CustomFormExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFormExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomFormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
