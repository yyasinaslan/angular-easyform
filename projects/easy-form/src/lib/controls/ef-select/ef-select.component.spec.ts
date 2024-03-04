import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfSelectComponent } from './ef-select.component';

describe('EfSelectComponent', () => {
  let component: EfSelectComponent;
  let fixture: ComponentFixture<EfSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
