import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfClearExampleComponent } from './ef-clear-example.component';

describe('EfClearExampleComponent', () => {
  let component: EfClearExampleComponent;
  let fixture: ComponentFixture<EfClearExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfClearExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfClearExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
