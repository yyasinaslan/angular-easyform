import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfSwitchComponent } from './ef-switch.component';

describe('EfSwitchComponent', () => {
  let component: EfSwitchComponent;
  let fixture: ComponentFixture<EfSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfSwitchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
