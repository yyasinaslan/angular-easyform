import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeSchemaComponent } from './alternative-schema.component';

describe('AlternativeSchemaComponent', () => {
  let component: AlternativeSchemaComponent;
  let fixture: ComponentFixture<AlternativeSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternativeSchemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternativeSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
