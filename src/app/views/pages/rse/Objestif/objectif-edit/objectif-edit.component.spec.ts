import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifEditComponent } from './objectif-edit.component';

describe('ObjectifEditComponent', () => {
  let component: ObjectifEditComponent;
  let fixture: ComponentFixture<ObjectifEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectifEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectifEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
