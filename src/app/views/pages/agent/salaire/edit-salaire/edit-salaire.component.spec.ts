import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaireComponent } from './edit-salaire.component';

describe('EditSalaireComponent', () => {
  let component: EditSalaireComponent;
  let fixture: ComponentFixture<EditSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
