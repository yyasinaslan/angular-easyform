import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfTextComponent } from './ef-text.component';

describe('EfTextComponent', () => {
  let component: EfTextComponent;
  let fixture: ComponentFixture<EfTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
