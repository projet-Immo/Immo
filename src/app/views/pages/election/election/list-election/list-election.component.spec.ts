import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElectionComponent } from './list-election.component';

describe('ListElectionComponent', () => {
  let component: ListElectionComponent;
  let fixture: ComponentFixture<ListElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListElectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
