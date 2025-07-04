import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMissionAgentComponent } from './add-mission-agent.component';

describe('AddMissionAgentComponent', () => {
  let component: AddMissionAgentComponent;
  let fixture: ComponentFixture<AddMissionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMissionAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMissionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
