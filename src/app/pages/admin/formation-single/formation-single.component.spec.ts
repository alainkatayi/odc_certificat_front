import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationSingleComponent } from './formation-single.component';

describe('FormationSingleComponent', () => {
  let component: FormationSingleComponent;
  let fixture: ComponentFixture<FormationSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
