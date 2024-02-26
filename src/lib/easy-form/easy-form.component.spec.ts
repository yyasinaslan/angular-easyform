import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyFormComponent } from './easy-form.component';

describe('EasyFormComponent', () => {
  let component: EasyFormComponent;
  let fixture: ComponentFixture<EasyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EasyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
