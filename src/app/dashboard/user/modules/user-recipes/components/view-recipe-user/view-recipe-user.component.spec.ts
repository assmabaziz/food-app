import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeUserComponent } from './view-recipe-user.component';

describe('ViewRecipeUserComponent', () => {
  let component: ViewRecipeUserComponent;
  let fixture: ComponentFixture<ViewRecipeUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecipeUserComponent]
    });
    fixture = TestBed.createComponent(ViewRecipeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
