import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteLayoutComponent } from './website-layout.component';

describe('WebsiteLayoutComponent', () => {
  let component: WebsiteLayoutComponent;
  let fixture: ComponentFixture<WebsiteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebsiteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
