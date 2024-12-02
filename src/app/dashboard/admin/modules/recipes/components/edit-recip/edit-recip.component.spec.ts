import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipComponent } from './edit-recip.component';

describe('EditRecipComponent', () => {
  let component: EditRecipComponent;
  let fixture: ComponentFixture<EditRecipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRecipComponent]
    });
    fixture = TestBed.createComponent(EditRecipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
