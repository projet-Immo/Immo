import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMissionAgentComponent } from './list-mission-agent.component';

describe('ListMissionAgentComponent', () => {
  let component: ListMissionAgentComponent;
  let fixture: ComponentFixture<ListMissionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMissionAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMissionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
