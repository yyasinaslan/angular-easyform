import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfExampleComponent } from './ef-example.component';

describe('EfExampleComponent', () => {
  let component: EfExampleComponent;
  let fixture: ComponentFixture<EfExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
