import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RseListProjetComponent } from './rse-list-projet.component';

describe('RseListProjetComponent', () => {
  let component: RseListProjetComponent;
  let fixture: ComponentFixture<RseListProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RseListProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RseListProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
