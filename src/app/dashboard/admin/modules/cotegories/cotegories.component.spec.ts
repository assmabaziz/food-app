import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotegoriesComponent } from './cotegories.component';

describe('CotegoriesComponent', () => {
  let component: CotegoriesComponent;
  let fixture: ComponentFixture<CotegoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotegoriesComponent]
    });
    fixture = TestBed.createComponent(CotegoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
