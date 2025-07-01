import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalaireComponent } from './list-salaire.component';

describe('ListSalaireComponent', () => {
  let component: ListSalaireComponent;
  let fixture: ComponentFixture<ListSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSalaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
