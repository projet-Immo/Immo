import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifAddComponent } from './objectif-add.component';

describe('ObjectifAddComponent', () => {
  let component: ObjectifAddComponent;
  let fixture: ComponentFixture<ObjectifAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectifAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectifAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
