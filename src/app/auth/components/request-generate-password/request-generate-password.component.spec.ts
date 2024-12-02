import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGeneratePasswordComponent } from './request-generate-password.component';

describe('RequestGeneratePasswordComponent', () => {
  let component: RequestGeneratePasswordComponent;
  let fixture: ComponentFixture<RequestGeneratePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestGeneratePasswordComponent]
    });
    fixture = TestBed.createComponent(RequestGeneratePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
