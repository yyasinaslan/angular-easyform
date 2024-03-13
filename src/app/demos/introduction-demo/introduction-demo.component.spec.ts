import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionDemoComponent } from './introduction-demo.component';

describe('IntroductionDemoComponent', () => {
  let component: IntroductionDemoComponent;
  let fixture: ComponentFixture<IntroductionDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroductionDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroductionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
