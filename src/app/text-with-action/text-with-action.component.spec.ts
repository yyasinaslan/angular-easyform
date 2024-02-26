import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithActionComponent } from './text-with-action.component';

describe('TextWithActionComponent', () => {
  let component: TextWithActionComponent;
  let fixture: ComponentFixture<TextWithActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWithActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextWithActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
