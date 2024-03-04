import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfFormArrayComponent } from './ef-form-array.component';

describe('EfFormArrayComponent', () => {
  let component: EfFormArrayComponent;
  let fixture: ComponentFixture<EfFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfFormArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
