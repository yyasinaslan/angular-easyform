import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfErrorsComponent } from './ef-errors.component';

describe('EfErrorsComponent', () => {
  let component: EfErrorsComponent;
  let fixture: ComponentFixture<EfErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfErrorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
