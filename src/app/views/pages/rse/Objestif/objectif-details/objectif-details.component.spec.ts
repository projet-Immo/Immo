import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifDetailsComponent } from './objectif-details.component';

describe('ObjectifDetailsComponent', () => {
  let component: ObjectifDetailsComponent;
  let fixture: ComponentFixture<ObjectifDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectifDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
