import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupArrayDemoComponent } from './group-array-demo.component';

describe('GroupArrayDemoComponent', () => {
  let component: GroupArrayDemoComponent;
  let fixture: ComponentFixture<GroupArrayDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupArrayDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupArrayDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
