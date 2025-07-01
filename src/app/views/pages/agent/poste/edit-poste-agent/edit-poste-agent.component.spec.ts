import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPosteAgentComponent } from './edit-poste-agent.component';

describe('EditPosteAgentComponent', () => {
  let component: EditPosteAgentComponent;
  let fixture: ComponentFixture<EditPosteAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPosteAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPosteAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
