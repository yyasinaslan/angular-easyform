import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDemoComponent } from './group-demo.component';

describe('GroupDemoComponent', () => {
  let component: GroupDemoComponent;
  let fixture: ComponentFixture<GroupDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
