import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfCheckboxComponent } from './ef-checkbox.component';

describe('EfCheckboxComponent', () => {
  let component: EfCheckboxComponent;
  let fixture: ComponentFixture<EfCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
