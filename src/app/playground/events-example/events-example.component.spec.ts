import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsExampleComponent } from './events-example.component';

describe('EventsExampleComponent', () => {
  let component: EventsExampleComponent;
  let fixture: ComponentFixture<EventsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
