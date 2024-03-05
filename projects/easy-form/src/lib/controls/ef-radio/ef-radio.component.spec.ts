import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfRadioComponent } from './ef-radio.component';

describe('EfRadioComponent', () => {
  let component: EfRadioComponent;
  let fixture: ComponentFixture<EfRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
