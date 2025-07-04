import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMissionAgentComponent } from './edit-mission-agent.component';

describe('EditMissionAgentComponent', () => {
  let component: EditMissionAgentComponent;
  let fixture: ComponentFixture<EditMissionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMissionAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMissionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
